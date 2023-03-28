const Question = require("../models/Question");

const question_router = require("express").Router();

question_router.get("/all", async (req, res) => {
	const allQuestions = await Question.find().sort({ createdAt: -1 });
	res.json(allQuestions);
});

question_router.get("/:id", async (req, res) => {
	const allQuestions = await Question.find({_id: req.params.id}).sort({ createdAt: -1 });
	res.json(allQuestions);
});

question_router.post("/new-question", async (req, res) => {
	// console.log(req.body);
	const question = await Question.create({
		title: req.body.title,
		description: req.body.description,
		asked_by: req.body.asked_by,
		author: req.body.author,
		answers: [],
	});
	const result = await question.save();
	console.log(result);
	res.send(result);
});

module.exports = question_router;
