var mongoose = require('mongoose');
var Bitly = require('bitly');
var bitly = new Bitly('peerspaceteam', 'R_ea31219197694855addedd567c8576a2');

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

function trimTrailingChars(s, charToTrim)
   {
     var regExp = new RegExp(charToTrim + "+$");
     var result = s.replace(regExp, "");

     return result;
   }



var deepLinkNew=function(state,city,neighborhood,title,space_use,_id){


    //var loc = neighborhood.split(",").reverse()
    //loc = loc.reverse()

    var state=state.toLowerCase().trim();
    state=trimTrailingChars('state','/')
    state=trimTrailingChars('state',',')

    var city=city.toLowerCase().trim()
    city=trimTrailingChars('city','/')
    city=trimTrailingChars('city',',')
    city=city.replace(/\s/g,'-')

    var neigh=neighborhood.toLowerCase().trim();
    neigh=trimTrailingChars('neigh','/')
    neigh=trimTrailingChars('neigh',',')
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
  longURI='http://deeplink.me/'+'peerspace.com/spaces/' + longURI

  bitly.shorten(longURI, function(err, response) {
    if (err) console.log(err);
    else {

          //check if response.data.url is valid #DD
          space.shortURL = response.data.url
          //res.redirect(short_url);
          next();
    }
  });
});

var Space = mongoose.model('Space', spaceSchema);
