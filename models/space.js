var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var spaceSchema = new Schema({
  space_name:  {type: String, unique: true, lowercase: true},
  space_features:  {type: String, uppercase: true},
  neighborhood: String,
  number_guests: Number,
  latitude: String,
  longitude: String,
  space_usages: [String],
  pricing: {
    hourly_rate: Number,
    min_hours:  Number
  },
  space_amenities:[String],
  host_ssoid: String,
  c_date: { type: Date, default: Date.now }
});

var Space = mongoose.model('Space', spaceSchema);
