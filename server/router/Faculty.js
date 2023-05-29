const Faculty = require("../models/Faculty");

const faculty_router = require("express").Router();

faculty_router.post("/register", async (req, res) => {
	const { username, useremail, password, gender, position, facultyID } = req.body;
	console.log(req.body);
	let faculty = await Faculty.findOne({
		email: useremail,
	});
	let newFaculty = null;
	if (faculty === null) {
		newFaculty = new Faculty({
			fullname: username,
			gender: gender,
			email: useremail,
			password: password,
			position: position,
			facultyID: facultyID
		});
		await newFaculty.save();
		console.log(newFaculty);
	} else {
		newFaculty =
			"You have already previously registered! Please login using the same email.";
	}
	res.send(newFaculty);
});

faculty_router.post("/login", async (req, res) => {
	const { useremail, password } = req.body;
	const response = await Faculty.findOne({
		email: useremail,
		password: password,
	});
	console.log(response);
	if (response === null) {
		res.send("Credentials did not match, please try again");
	} else {
		res.send(response);
	}
});

faculty_router.get("/:id", async (req, res) => {
	const response = await Faculty.find({ _id: req.params.id });
	res.json(response);
});

faculty_router.get('/', async (req, res) => {
	const response = await Faculty.find();
	// console.log(response);
	res.json(response);
})

module.exports = faculty_router;
