const timetable_router = require("express").Router();
const Timetable = require("../models/Timetable");

timetable_router.post("/", async (req, res) => {
	const { branch, year, section } = req.body;
	const timetable = await Timetable.find({
		branch: "CSE",
		year: "1",
		section: "A",
	});
	console.log(timetable);
	res.send(timetable);
});

module.exports = timetable_router;

