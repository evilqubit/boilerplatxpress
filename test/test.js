var request = require('request');
var host = 'http://localhost:3000/';

var addSpace = function(space, callback){
    request.post(host+'api/v1/spaces', function(err, resp, body){
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
    var test_space = {
        "space_features": "E2",
        "number_guests": 100,
        "space_name": "foobar"+i,
        "neighborhood": "SOMA,asd SanFrancisco",
        "latitude": "14.122",
        "longitude": "15.1521",
        "space_usages": [
            "Eventasd"
        ],
        "pricing": {
            "hourly_rate": 10000,
            "min_hours": 3
        },
        "space_amenities": [
            "KitchenFacilities",
            "Whiteboard",
            "Chairs"
        ],
        "host_ssoid": "6499f41c0d0511e4966206f116f37bf8asdasdasd"
    }

    addSpace(test_space,function(data){

    });
}


/*addSpace(test_space1,function(data){
        getAll();
});*/
