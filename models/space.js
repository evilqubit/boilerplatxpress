var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var spaceSchema = new Schema({
  _id: {type: Schema.Types.Mixed, index: true},
  title:  {type: String, unique: true},
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

var Space = mongoose.model('Space', spaceSchema);
