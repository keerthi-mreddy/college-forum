const { Question, Answer, Comment } = require("../models/Question.js");

const question_router = require("express").Router();

question_router.get("/all", async (req, res) => {
	const allQuestions = await Question.find().sort({ createdAt: -1 });
	res.json(allQuestions);
});

question_router.get("/:id", async (req, res) => {
	const questionId = req.params.id;
	const all = await Question.find({ _id: questionId }).populate({
		path: "answers",
		populate: {
			path: "comments",
		},
	});
	res.send(all);
});

question_router.get("/", async (req, res) => {
	const all = await Question.find().populate({
		path: "answers",
		populate: {
			path: "comments",
		},
	});
	res.send(all);
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

question_router.post("/get-answers", async (req, res) => {
	const questionId = req.body.questionId;
	console.log(questionId);
	const allQuestionAnswers = await Question.find({
		_id: questionId,
	}).populate("answers");
	let allAnswers = [];
	if (allQuestionAnswers.length !== 0) {
		console.log(allQuestionAnswers[0].answers);
		allAnswers = allQuestionAnswers[0].answers;
	}
	res.json(allAnswers);
});

question_router.post("/new-answer", async (req, res) => {
	console.log(req.body);
	const { questionId, given_by, answer, author } = req.body;
	const newAnswer = new Answer({
		given_by: given_by,
		answer: answer,
		author: author,
		upvoted_by: [],
		comments: [],
	});
	await newAnswer.save();
	const question = await Question.find({ _id: questionId });
	const updatedAnswerArray = question[0].answers;
	updatedAnswerArray.push(newAnswer._id);
	await Question.findOneAndUpdate(
		{ _id: questionId },
		{ answers: updatedAnswerArray }
	);
	console.log("Answer Added");
	res.json(newAnswer);
});

question_router.post("/get-comments", async (req, res) => {
	const { answerId } = req.body;
	const allComments = await Answer.find({ _id: answerId }).populate(
		"comments"
	);
	res.json(allComments);
});

question_router.post("/new-comment", async (req, res) => {
	const { answerId, author, comment, given_by } = req.body;
	const addedComment = new Comment({
		author,
		comment,
		given_by,
	});
	await addedComment.save();
	const allComments = await Answer.find({ _id: answerId });
	let result = "";
	if (allComments.length > 0) {
		const updatedComments = [...allComments[0].comments, addedComment._id];
		console.log(updatedComments);
		result = await Answer.findOneAndUpdate(
			{ _id: answerId },
			{ comments: updatedComments }
		);
	}
	res.json(result);
});

question_router.post("/upvote", async (req, res) => {
	const { answerId, userId } = req.body;
	const answers = await Answer.find({ _id: answerId });
	// console.log(answers);
	if (answers.length > 0) {
		// we need to add to the userId to the upvoted by array
		let upvotes = answers[0].upvoted_by;
		// console.log(upvotes);
		if (upvotes.includes(userId) == false) {
			upvotes.push(userId);
		} else {
			upvotes = upvotes.filter((id) => id.toString() !== userId);
		}
		console.log(upvotes);
		await Answer.updateOne({ _id: answerId }, { upvoted_by: upvotes });
	}
	res.json(answers);
});

module.exports = question_router;
