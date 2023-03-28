const { default: mongoose } = require("mongoose");

const AnswerSchema = new mongoose.Schema({
	given_by: {
		type: ObjectId, ref: 'users',
	},
	answer: {
		type: String,
	},
	upvoted_by: {
		type: Array,
	},
	// comments: {
	// 	type: [{ type: Schema.Types.ObjectId, ref: "comments" }],
	// },
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

var Answer = mongoose.model("answers", AnswerSchema);