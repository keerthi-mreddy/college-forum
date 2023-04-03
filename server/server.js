// import required modules
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

let cors = require("cors");
const user_router = require("./router/User");
const question_router = require("./router/Question");
const faculty_router = require("./router/Faculty");
const timetable_router = require("./router/Timetable");

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
app.use("/users", user_router);
app.use("/questions", question_router);
app.use("/faculty", faculty_router);
app.use("/timetable", timetable_router);

// start server
const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
