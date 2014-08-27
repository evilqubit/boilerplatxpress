var spaces = require('../controllers/spaces');

module.exports = function(app){
    app.get('/',function(req, res){
        res.send("The PeerSpace API is on!");
    });
    app.post('/api/spaces',spaces.create);
    app.get('/api/spaces',spaces.readAll);
    app.get('/api/spaces/search/',spaces.search);
    app.get('/api/spaces/:id',spaces.singleRead);
    app.put('/api/spaces/:id', spaces.update);
    app.delete('/api/spaces/:id',spaces.delete);

}
