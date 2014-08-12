var mongoose = require('mongoose');

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
    console.log(skip + " " + limit);
    Space.find(null,null,{ skip: skip, limit: limit },function(err, spaces){
        if(err) console.log(err);
        else{
            console.log("Read All Spaces");
            return res.send(spaces);
        }
    });
}

exports.singleRead = function(req, res){
  var id = req.param('id');
  Space.findById(id, function(err, space){
      if(err) console.log(err);
      else{
          console.log("Read Space with id: \'" + id + "\'");
          return res.send(space);
      }
  })
};

exports.update = function(req, res){
    var id = req.param('id');
    Space.findById(id, function(err, space){
        space.name = req.body.name;
        space.private = req.body.private;
        space.meta = req.body.meta;
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
    return Space.find({name: regex},null,{ skip: skip, limit: limit }, function(err,q){
        return res.send(q);
    });
}
