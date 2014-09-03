var spaces = require('../controllers/spaces');
var mid = require('./middlewares');

module.exports = function(app){
    app.get('/',function(req, res){
        return res.redirect("http://www.peerspace.com/4.04.4004");
    });

    //Depreciated
    //app.post('/api/spaces',spaces.create);
    //app.get('/api/spaces/:id',spaces.singleRead);
    //app.put('/api/spaces/:id', spaces.update);
    //app.delete('/api/spaces/:id',spaces.delete);

    app.get('/api/spaces',spaces.readAll);
    app.get('/api/spaces/search/',mid.restrictToIP,spaces.search);
    app.get('/:uuid',spaces.singleReadLongURI);
    app.get('/api/geo',spaces.geo);

}
