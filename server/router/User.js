const express = require("express");
const User = require("../models/User");
const user_router = require("express").Router();

user_router.get("/", async (req, res) => {
	const users = await User.find();
	res.json(users);
});

user_router.get("/:id", async (req, res) => {
	const user = await User.find({ _id: req.params.id });
	res.json(user);
});

user_router.post("/login", async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	});
	console.log(user);
	if (user == null) {
		res.send("Credentials did not match, sorry! Please try again");
	} else {
		res.send(user);
	}
});

user_router.post("/register", async (req, res) => {
	let user = await User.findOne({
		email: req.body.email,
	});
	console.log(user);
	let newUser = null;
	if (user === null) {
		// hence no user
		// we need to save
		console.log(req.body);
		newUser = await User.create({
			fullname: req.body.fullname,
			gender: req.body.gender,
			rollNumber: req.body.rollNumber,
			email: req.body.email,
			year: req.body.year,
			branch: req.body.branch,
			password: req.body.password,
			section: req.body.section,
		});
		newUser.save();
		user = newUser;
	} else {
		user =
			"You have already previously registered! Please login using the same email.";
	}
	res.send(user);
});

user_router.put("/:id", async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			updatedAt: Date.now(),
		},
		{ new: true }
	);
	res.json(user);
});

user_router.delete("/:id", async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.json({ message: "User deleted successfully" });
});

user_router.post("/verified", async (req, res) => {
	const { roll_number } = req.body;
	console.log(roll_number);
	// find by roll_number and update status to verified
	const user = await User.find({ rollNumber: roll_number });
	if (user.length !== 0) {
		await User.findOneAndUpdate(
			{ rollNumber: roll_number },
			{ verification_status: true }
		);
	}
	console.log('Verification Done for Roll Number: ' + roll_number);
	res.send('OK');
});

module.exports = user_router;
