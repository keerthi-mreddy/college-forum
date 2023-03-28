const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const QuestionSchema = new mongoose.Schema({
	title: String,
	description: String,
	asked_by: ObjectId,
	author: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
    answers: [{type: ObjectId, ref: "answers"}]
});

var Question = mongoose.model("questions", QuestionSchema);

module.exports = Question;