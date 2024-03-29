var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var publicSpaces = path.resolve(__dirname + "/../" + "public/spaces/");
var Space = mongoose.model('Space');
var winston = require('winston');
var request = require('request');

var deepLink=function(neighborhood,title,space_use,_id){
    var loc = neighborhood.split(",").reverse()
    //loc = loc.reverse()
    var state=loc[1]
    state=state.toLowerCase().trim();
    var city=loc[2];
    city=city.toLowerCase().trim();
    city=city.replace(/\s/g,'-')
    var neigh=loc[3]
    neigh=neigh.toLowerCase().trim();
    neigh=neigh.replace(/\s/g,'-')
    var title=title.toLowerCase().trim()
    title=title.replace(/\s/g,'-')
    var space_use=space_use.toLowerCase().trim()
    space_use=space_use.replace(/\s/g,'-')
    var id=_id
    var url=state+' '+ city +' '+neigh+' '+title+' '+space_use+' '+id
    var url=url.replace(/\s/g,'_')

    return url;
}





var deepLinkNew=function(state,city,neighborhood,title,space_use,_id){


    //var loc = neighborhood.split(",").reverse()
    //loc = loc.reverse()
    //var state=loc[1]
    var state=state.toLowerCase().trim();
    //var city=loc[2];
    var city=city.toLowerCase().trim();
    city=city.replace(/\s/g,'-')
    //var neigh=loc[3]
    var neigh=neighborhood.toLowerCase().trim();
    neigh=neigh.replace(/\s/g,'-')
    var title=title.toLowerCase().trim()
    title=title.replace(/\s/g,'-')
    var space_use=space_use.toLowerCase().trim()
    space_use=space_use.replace(/\s/g,'-')
    var id=_id

    var url= (typeof state !== "undefined" ? state :"")
    +(typeof city !== "undefined" ?  " "+city :"")
    +(typeof neigh !== "undefined" ?  " "+neigh :"")
    +(typeof title !== "undefined" ?  " "+title :"")
    +(typeof space_use !== "undefined" ?  " "+space_use :"")
    +(typeof id !== "undefined" ?  " "+id :"")

    var url=url.replace(/\s/g,'_')

    return url;
}




exports.create = function(req, res){
    var space = new Space(req.body);

    space.save(function(err){
        if(err) winston.error(err);
        else {
            winston.info("ADD SPACE #" + space.id);
            return res.send(space);
        }
    })
};

exports.readAll = function(req, res){
    var skip = req.query.skip || 0;
    var limit = req.query.limit || 200;
    Space.find(null,null,{ skip: skip, limit: limit },function(err, spaces){
        if(err) winston.error(err);
        else{
            winston.info("READ ALL SPACES");
            return res.send(spaces);
        }
    });
}

renderSpace = function(res, spaces){
    res.render('space',spaces,function(err, html){
        if (err) winston.error(err);
        var id = spaces.space._id;
        var spacePath = publicSpaces + "/" + id +'.html';
        fs.exists(spacePath,function(exists){
            if(exists){
                winston.info("GET CACHE SPACE #" + id);
                return res.sendfile(spacePath);
            }
            else {
                fs.writeFile(spacePath, html, function (err) {
                    if (err) return winston.error(err);
                    else {
                        winston.info("CACHING SPACE #" + id);
                        return res.sendfile(spacePath);
                    }
                });
            }
        })
    });
}

exports.singleReadLongURI = function(req, res){
    var uuid = req.param('uuid');
    var uuid_arr = uuid.split("_");
    var id = uuid_arr[uuid_arr.length-1];

    Space.find({_id:id}, function(err, space){
        var u_id = space[0].owner.user_id;
        request('https://dev01-api.peerspaceapp.com/api/v1/reviews/host/stars/'+u_id, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                space[0].stars=JSON.parse(body).stars;
                //console.log(space[0].stars)
                parseSpace()
            }
            else {
                space[0].stars=0;
                parseSpace()
            }
        })

        function parseSpace(){
            if(err) winston.error(err);
            else{
                if(typeof space[0] !== 'undefined'){
                    if (typeof space[0].city === 'undefined') {
                        space[0].url=deepLink(space[0].neighborhood,space[0].title,space[0].space_use[0].name,space[0]._id);
                    } else {

                        space[0].url=deepLinkNew(space[0].state,space[0].city,space[0].neighborhood,space[0].title,space[0].space_use[0].name,space[0]._id);

                    }

                    space[0].url='http://deeplink.me/'+'peerspace.com/spaces/' + space[0].url
                    return renderSpace(res,{space:space[0]});
                }
                else {
                    winston.error("CANT GET SPACE #" + id);
                    return res.redirect("http://www.peerspace.com/4.04.4004");
                }
            }
        }

    })
};


exports.singleRead = function(req, res){

    var id = req.param('id');
    var type = req.query.t || "html";
    Space.find({_id:id}, function(err, space){
        if(err) winston.error(err);

        else{
            if(typeof space[0] !== 'undefined'){
                if(type === "html")
                    return renderSpace(res,{space:space[0]});
                    else {
                        winston.info("GET JSON SPACE #" + id);
                        return res.send(space);
                    }
                }
                else {
                    winston.error("CANT GET SPACE #" + id);
                    return res.redirect("http://www.peerspace.com/4.04.4004");
                }
            }
        })
    };

    exports.update = function(req, res){
        var id = req.param('id');
        Space.findById(id, function(err, space){
            space.title = req.body.title;
            space.duration = req.body.duration;
            space.neighborhood = req.body.neighborhood;
            space.features = req.body.features;
            space.latitude = req.body.latitude;
            space.longitude = req.body.longitude;
            space.number_guests = req.body.number_guests;
            space.rules = req.body.rules;
            space.images = req.body.images; //Check Array
            space.owner.user_id = req.body.owner.user_id;
            space.owner.first_name = req.body.owner.first_name;
            space.owner.last_name = req.body.owner.last_name;
            space.owner.position = req.body.owner.position;
            space.owner.url = req.body.owner.url;
            space.owner.avatar_url = req.body.owner.avatar_url;
            space.amenities = req.body.amenities; //Check Array
            space.space_use = req.body.space_use; //Check Array
            space.price = req.body.price; //Check Array

            space.save(function(err){
                if(err) winston.error(err);
                else
                    winston.info("PUT SPACE #" + id);
                    return res.send(space);
                });
            });
        };

        exports.delete = function(req, res){
            var id = req.param('id');
            Space.findById(id, function(err, space){
                space.remove(function(err){
                    if(err) winston.error(err);
                    else {
                        winston.info("DEL SPACE #" + id);
                        return res.send("DEL SPACE: #" + id);
                    }
                })
            })
        };

        exports.search = function(req, res){
            var skip = req.query.skip || 0;
            var limit = req.query.limit || 200;
            var regex = new RegExp(req.query.q, 'i');
            return Space.find({title: regex},'shortURL title',{ skip: skip, limit: limit }, function(err,q){
                if(err) winston.error(err);
                else{
                    winston.info("SEARCH TITLE: " + regex);
                    return res.send(q);
                }
            });
        }
        exports.geo = function(req, res){
            var skip = req.query.skip || 0;
            var limit = req.query.limit || 200;
            Space.find(null,'latitude longitude',{ skip: skip, limit: limit },function(err, spaces){
                if(err) winston.error(err);
                else{
                    winston.info("READ ALL SPACES");
                    return res.json(spaces);
                }
            });
        }
