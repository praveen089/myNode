const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String, required: true, max: 100},
    mobile: {type: Number, required: true, min:10},
    email: {type: String, required: true, max: 80},
    password: {type: String, required: true, max: 15},
    gender: {type:String},
    image: String,
    status: Number,
    usertype: Number,
    address: String,
	createdAt: { type: Date },
	updatedAt: { type: Date }
});


// Export the model
module.exports = mongoose.model('User', UserSchema);