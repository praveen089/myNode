const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    category: {type: Number, required: true},
    description: String,
    status: Number,
    quantity: Number,
    price: {type: Number, required: true},
    createdAt: { type: Date },
	updatedAt: { type: Date }
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);