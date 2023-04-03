// define user schema
const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	position:{
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

// create user model
const Faculty = mongoose.model("faculty", facultySchema);

// exporting the model
module.exports = Faculty;
