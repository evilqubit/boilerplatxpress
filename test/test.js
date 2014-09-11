var request = require('request');
var path = require('path');
var host = 'http://peerspace.com/spaces';

var addSpace = function(space, callback){
    request.post(host+'/api/spaces', function(err, resp, body){
        if (!err && resp.statusCode == 200){
            body = JSON.parse(body);
            console.log("Adding new space with id: " + body._id);
            return callback(body);
        }
        else  console.log(err);
    }).form(space);

}

var getAll = function(){
    request.get(host+'api/v1/spaces/', function(err, resp, body){
        console.log("List All Spaces:");
        console.log(JSON.parse(body));
    });
}

function updateSingle(id, space, callback){
    request.put(host+'api/v1/spaces/'+id, function(err, resp, body){
        if (!err && resp.statusCode == 200) {
            body = JSON.parse(body);
            console.log("PUT: update Space with id:" +id);
            return callback(body);
        }
    }).form(space);
}

function delSingle(id, callback){
    request.del(host+'api/v1/spaces/'+id, function(err, resp, body){
        if(!err && resp.statusCode == 200) {
            console.log("DEL: space with id: " + id);
            return callback(body);
        }
    });
}


console.log("PeerSpace Spaces Migration");
console.log("*****************************\n");

var spaces = require('./spaces.json');

for (var i =0; i<4;i++){
    addSpace(spaces.spaces[i],function(data){})
}
