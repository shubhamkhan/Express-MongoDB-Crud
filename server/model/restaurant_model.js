const mongoose = require('mongoose');

const restaurant_schema = new mongoose.Schema({
    name: {type:String, required: true},
    address: {type:String, required: true},
    price: {type:String, required: true},
    time: {type:String, required: true},
    rating: {type:String, required: true}
});

const restaurant_model = mongoose.model('restaurants', restaurant_schema);

module.exports = restaurant_model;