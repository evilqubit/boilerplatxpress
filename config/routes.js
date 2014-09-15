var spaces = require('../controllers/spaces');
var mid = require('./middlewares');

module.exports = function(app){
    app.get('/',function(req, res){
        return res.redirect("http://www.peerspace.com/4.04.4004");
    });

    //Depreciated
    //app.get('/api/spaces/:id',spaces.singleRead);
    //app.delete('/api/spaces/:id',spaces.delete);

    app.get('/all',mid.restrictToIP,spaces.readAll);
    app.get('/search',mid.restrictToIP,mid.bitlyURL,spaces.search);
    app.get('/b/search',mid.restrictToIP,spaces.search);
    app.get('/:uuid',spaces.singleReadLongURI);
    app.get('/api/geo',spaces.geo);
    app.post('/api/spaces',spaces.create);
    app.put('/api/spaces/:id',mid.restrictToIP, spaces.update);

}
