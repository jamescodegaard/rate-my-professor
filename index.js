const leftPad = require("left-pad");
const output = leftPad("Hello, World!", 15);
console.log(output);

const express = require("express");
const bodyParser = require("body-parser");
// const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./queries");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// app.get("/", (request, response) => {
//   response.json({ info: "Node.js, Express, and Postgres API" });
// });

// Users
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

// Professors
app.get("/professors", db.getProfessors);
app.get("/professors/:id", db.getProfessorById);
app.post("/professors", db.createProfessor);
app.put("/professors/:id", db.updateProfessor);
app.delete("/professors/:id", db.deleteProfessor);

// Reviews
app.get("/reviews", db.getReviews);
app.get("/reviews/:id", db.getReviewById);
app.post("/reviews", db.createReview);
app.put("/reviews/:id", db.updateReview);
app.delete("/reviews/:id", db.deleteReview);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
