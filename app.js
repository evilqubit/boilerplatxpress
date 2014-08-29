
/**
 * PeerSpace REST API engine.
 */

var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var winston = require('winston');
winston.add(winston.transports.File, { filename: 'logs/logfile.log' });
winston.remove(winston.transports.Console);

var app = express();

var env = process.env.NODE_ENV || 'dev'
var config = require('./config/config')[env]

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

var app = express()
// express settings
require('./config/express')(app, config)

// Bootstrap routes
require('./config/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  winston.info('PeerSpace API on port ' + app.get('port'));
});
