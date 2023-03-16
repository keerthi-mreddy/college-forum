// import required modules
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/User");
let cors = require("cors");

const MongoURL =
	"mongodb+srv://CollegeForumUser:CollegeForumUserPassword@college-forum-database.1ff6zxs.mongodb.net/?retryWrites=true&w=majority";

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// set up MongoDB connection
mongoose
	.connect(MongoURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB", err));

app.use(cors());

// routes
app.get("/users", async (req, res) => {
	const users = await User.find();
	res.json(users);
});

app.get("/users/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
	res.json(user);
});

app.post("/users", async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	try {
		console.log("User Created");
		await user.save();
		res.json(user);
	} catch (error) {
		const err =
			"Email has already been possibly used! Please login using that email";
		console.log(err);
		res.send(err);
	}
});

app.post("/users/login", async (req, res) => {
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

app.post("/users/register", async (req, res) => {
	let user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	});
	console.log(user);
	let newUser = null;
	if (user == null) {
		// hence no user
		// we need to save
		console.log(req.body);
		newUser = await User.create({
			fullname: req.body.fullname,
			gender: req.body.gender,
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

app.put("/users/:id", async (req, res) => {
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

app.delete("/users/:id", async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.json({ message: "User deleted successfully" });
});

// start server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
