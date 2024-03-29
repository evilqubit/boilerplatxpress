var newrelic=require ('newrelic');
/**
 * PeerSpace REST API engine.
 */
var app_env = process.env.NODE_ENV;
/*New Relic*/


/*App config*/

var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var winston = require('winston');
if (app_env === 'prod')
    winston.add(winston.transports.File, { filename: '/home/webdev/psAPI/ListingsAPI/logs/logfile.log' });
else
    winston.add(winston.transports.File, { filename: 'logs/logfile.log' });

winston.remove(winston.transports.Console);

var app = express();
if (app_env === 'prod')  {
   module.exports.agent_enabled = true;
   app.locals.newrelic = newrelic
} else {
   module.exports.agent_enabled = false;
 }


var env = app_env || 'dev'
var config = require('./config/config')[env]

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

//var app = express()
// express settings
require('./config/express')(app, config)

// Bootstrap routes
require('./config/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  winston.info('PeerSpace API on port ' + app.get('port'));
});
