const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BlogSchema = new Schema({
    title: {type: String, required: true},
    message: {type: String, required: true},
    course_id: {type: Number},
    user_id: {type: Number},
    status: {type: Number},    
    createdAt: { type: Date },
	updatedAt: { type: Date }
});


// Export the model
module.exports = mongoose.model('Blogs', BlogSchema);