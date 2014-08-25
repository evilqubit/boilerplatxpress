var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var publicSpaces = path.resolve(__dirname + "/../" + "public/spaces/");
var Space = mongoose.model('Space');

exports.create = function(req, res){

    var space = new Space(req.body);

    space.save(function(err){
        if(err) console.log(err);
        else {
            console.log("New Space with id: \'" + space.id + "\' was created");
            return res.send(space);
        }
    })
};

exports.readAll = function(req, res){
    var skip = req.query.skip || 0;
    var limit = req.query.limit || 200;
    Space.find(null,null,{ skip: skip, limit: limit },function(err, spaces){
        if(err) console.log(err);
        else{
            console.log("Read All Spaces");
            return res.send(spaces);
        }
    });
}

renderSpace = function(res, spaces){
    res.render('space',spaces,function(err, html){
        if (err) console.log(err);
        var id = spaces.space._id;
        var spacePath = publicSpaces + "/" + id +'.html';
        fs.exists(spacePath,function(exists){
            if(exists){
                    console.log("Space sent from cache");
                    return res.sendfile(spacePath);
            }
            else {
                fs.writeFile(spacePath, html, function (err) {
                    if (err) return console.log(err);
                    else return res.sendfile(spacePath);
                });
            }
        })
    });
}

exports.singleRead = function(req, res){
  var id = req.param('id');
  Space.find({_id:id}, function(err, space){
      if(err) console.log(err);
      else{
          console.log("Read Space with id: \'" + id + "\'");
          if(typeof space[0] !== 'undefined')
              return renderSpace(res,{space:space[0]});
          else return res.send("Can't find id");
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
            if(err) console.log(err);
            else
                return res.send(space);
        });
    });
};

exports.delete = function(req, res){
  var id = req.param('id');
  Space.findById(id, function(err, space){
      space.remove(function(err){
          if(err) console.log(err)
          else {
              return res.send("Space with id:" + id + " is removed");
          }
      })
  })
};

exports.search = function(req, res){
    var skip = req.query.skip || 0;
    var limit = req.query.limit || 200;
    var regex = new RegExp(req.query.q, 'i');
    return Space.find({title: regex},null,{ skip: skip, limit: limit }, function(err,q){
        return res.send(q);
    });
}
