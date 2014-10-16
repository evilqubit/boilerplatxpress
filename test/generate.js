var request = require('request');
var path = require('path');
var host = 'http://localhost:3000';
var _ = require('underscore');

var generateAll = function(){
    request.get(host+'/all', function(err, resp, body){
        _.each(JSON.parse(body), function(item, i){
            console.log(item._id);
            request.get(host+'/_'+item._id, function(err, resp, body){
                console.log(body);
            });
        });

    });
}

console.log("PeerSpace Generate Spaces");
console.log("*****************************\n");
generateAll();
