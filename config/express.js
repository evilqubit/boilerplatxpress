var express = require('express');

module.exports = function (app, config) {
    app.set('views', config.root + '/views');
    app.set('view engine', 'hjs');
    app.use(express.compress());
    app.use('/', express.static(config.root + '/public'));
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
}
