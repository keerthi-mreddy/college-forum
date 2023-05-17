// define user schema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
	year: {
		type: String,
		required: true,
	},
	branch: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	section: {
		type: String,
		required: true,
	},
	rollNumber: {
		type: String,
		required: true,
	},
	verification_status: {
		type: Boolean,
		default: false,
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
const User = mongoose.model("users", userSchema);

// exporting the model
module.exports = User;
