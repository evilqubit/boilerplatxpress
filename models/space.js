var mongoose = require('mongoose');
var Bitly = require('bitly');
var bitly = new Bitly('o_2o6vdo5f18', 'R_3190110b3a874c79951e398b7d279b7a');

var Schema = mongoose.Schema;

var spaceSchema = new Schema({
  _id: {type: Schema.Types.Mixed, index: true},
  title:  {type: String, unique: true},
  state: String,
  city: String,
  shortURL: String,
  neighborhood: String,
  duration: Number,
  features: String,
  number_guests: Number,
  latitude: Number,
  longitude: Number,
  price: [Schema.Types.Mixed],
  space_use:[Schema.Types.Mixed],
  amenities:[Schema.Types.Mixed],
  owner:{
      user_id: String,
      first_name: String,
      last_name: String,
      url: String,
      position: String,
      avatar_url: String
  },
  rules: String,
  images: [String],
  c_date: { type: Date, default: Date.now }
});



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


spaceSchema.pre('save', function (next) {
  var space = this;
  var longURI = deepLinkNew(space.state,space.city,space.neighborhood,space.title,space.space_use[0].name,space._id);
console.log(longURI);
  bitly.shorten(longURI, function(err, response) {
    if (err) console.log(err);
    else {
          space.shortURL = response.data.url

          //res.redirect(short_url);
          next();
    }
  });
});

var Space = mongoose.model('Space', spaceSchema);
