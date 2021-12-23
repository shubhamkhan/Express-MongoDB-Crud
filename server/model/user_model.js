const mongoose= require('mongoose');

const user_schema = new mongoose.Schema({
    name: {type:String, required: true},
    username:{type: String, required:true},
    password:{type:String, required:true}
});

const user_model= mongoose.model('users', user_schema);

module.exports= user_model;