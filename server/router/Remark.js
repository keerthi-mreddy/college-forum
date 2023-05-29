const Remark = require("../models/Remark");

const remark_router = require("express").Router();

remark_router.post("/new-remark", async (req, res) => {
	// console.log(req.body);
	const { studentId, facultyId, remark } = req.body;
	const newRemark = new Remark({
		studentId,
		facultyId,
		remark,
	});
	await newRemark.save();
	res.sendStatus(200);
});

remark_router.post("/get-remark", async (req, res) => {
	const { studentId, facultyId } = req.body;
	const details = await Remark.find({
		studentId: studentId,
		facultyId: facultyId,
	}).sort({ date: -1 });
	console.log(details);
	res.send(details);
});

module.exports = remark_router;
