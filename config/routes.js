var spaces = require('../controllers/spaces');

module.exports = function(app){
    app.get('/',function(req, res){
        res.send("The PeerSpace API is on!");
    });
    app.post('/api/v1/spaces',spaces.create);
    app.get('/api/v1/spaces/',spaces.readAll);
    app.get('/api/v1/spaces/search/',spaces.search);
    app.get('/api/v1/spaces/:id',spaces.singleRead);
    app.put('/api/v1/spaces/:id', spaces.update);
    app.delete('/api/v1/spaces/:id',spaces.delete);

}
