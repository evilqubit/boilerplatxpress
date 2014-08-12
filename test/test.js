var request = require('request');

var space1 = {
    name: 'chalex',
    private: false,
    meta: {
        rooms: 3,
        desks: 6
    }
};

var space2 = {
    name: 'Besha',
    private: false,
    meta: {
        rooms: 1,
        desks: 2
    }
};

var space3 = {
    name: 'Sanctuary',
    private: true,
    meta: {
        rooms: 8,
        desks: 19
    }
};

var host = 'http://localhost:3000/';

var addSpace = function(space, callback){
    request.post(host+'api/spaces', function(err, resp, body){
        if (!err && resp.statusCode == 200){
            body = JSON.parse(body);
            console.log("Adding new space with id: " + body._id);
            return callback(body);
        }
        else  console.log(err);
    }).form(space);

}

var getAll = function(){
    request.get(host+'api/spaces/', function(err, resp, body){
        console.log("List All Spaces:");
        console.log(JSON.parse(body));
    });
}

function updateSingle(id, space, callback){
    request.put(host+'api/spaces/'+id, function(err, resp, body){
        if (!err && resp.statusCode == 200) {
            body = JSON.parse(body);
            console.log("PUT: update Space with id:" +id);
            return callback(body);
        }
    }).form(space);
}

function delSingle(id, callback){
    request.del(host+'api/spaces/'+id, function(err, resp, body){
        if(!err && resp.statusCode == 200) {
            console.log("DEL: space with id: " + id);
            return callback(body);
        }
    });
}


console.log("PeerSpace REST API simulation");
console.log("*****************************\n");

/*addSpace(space1,function(data){
    var id = data._id;
    updateSingle(id, space2, function(data){

    });
});

addSpace(space3,function(data){
    var id = data._id;
    delSingle(id, function(data){
        getAll();
    });
});
*/
for(var i=0; i< 10000; i++){
    var iSpace = {
        name: 'chalex'+i,
        private: false,
        meta: {
            rooms: i,
            desks: 6
        }
    }
    addSpace(iSpace,function(data){

    });
}
