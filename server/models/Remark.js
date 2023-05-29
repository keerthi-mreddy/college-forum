const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const RemarkSchema = new mongoose.Schema({
	studentId: {
		type: ObjectId,
		ref: "users",
		required: true,
	},
	facultyId: {
		type: ObjectId,
		ref: "faculties",
		required: true,
	},
	remark: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Remark = mongoose.model("remark", RemarkSchema);
module.exports = Remark;
