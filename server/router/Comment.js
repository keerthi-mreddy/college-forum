const mongoose = require("mongoose");

const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
	given_by: { type: ObjectId, ref: "users" },
	comment: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

var Comment = mongoose.model("comments", CommentSchema);
