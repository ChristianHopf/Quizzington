const express = require("express");
const mysql2 = require("mysql2");
const path = require("path");
const cors = require("cors");
var nodeUuid = require("node-uuid");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const PORT = 5000;

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "SpaceCoffee879",
  database: "quizzington",
});

// POST quiz request body:
const exampleQuiz = {
  title: "Quiz Title",
  questions: [
    {
      text: "Where am I?",
      type: "mc",
      choices: ["Quizzington", "Home Depot", "Movement Plano", "Space"],
      correct_choice: 0,
      order: 0,
    },
    {
      text: "Climbing gym",
      type: "mc",
      choices: ["Quizzington", "Home Depot", "Movement Plano", "Space"],
      correct_choice: 2,
      order: 1,
    },
    {
      text: "Home Depot",
      type: "mc",
      choices: ["Quizzington", "Home Depot", "Movement Plano", "Space"],
      correct_choice: 1,
      order: 2,
    },
    {
      text: "Nice weather today",
      type: "tf",
      choices: null,
      correct_choice: 0,
      order: 3,
    },
  ],
};

app.get("/quiz/:id", (req, res) => {
  const quizId = req.params.id;
  const binaryId = Buffer.from(quizId, "binary");
  const query = "SELECT * FROM quizzes WHERE quiz_id = ?";
  db.query(query, [binaryId], (err, result) => {
    if (err) {
      res.json({ message: "Something went wrong: " + err });
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    const quiz = result[0];
    res.status(200).json({ quiz: quiz });
  });
});

app.post("/add_quiz", (req, res) => {
  // Generate quiz id for quiz primary key and question foreign key
  const quizId = nodeUuid.v4();
  const binaryId = Buffer.from(quizId.replace("-", ""), "hex");
  // Query to post quiz
  let query = "INSERT INTO quizzes (`quiz_id`, `title`) VALUES (?, ?)";
  let values = [quizId, req.body.title];
  console.log(values);
  db.query(query, values, (err, result) => {
    if (err) {
      res.json({ message: "Something went wrong: " + err });
    } else {
      // Query to post questions
      query =
        "INSERT INTO questions (`quiz_id`, `question_text`, `question_type`, `choices`, `correct_choice`, `order_num`) VALUES (?, ?, ?, ?, ?, ?)";
      for (const question of req.body.questions) {
        // Generate question id
        // const questionId = Buffer.from(nodeUuid.v4().replace("-", ""), "hex");
        values = [
          // questionId,
          binaryId,
          question.question_text,
          question.question_type,
          JSON.stringify(question.choices),
          question.correct_choice,
          question.order_num,
        ];
        console.log(values);
        db.query(query, values, (err, result) => {
          if (err) {
            console.error("Error inserting question:", err);
            res.status(500).json({
              message: "Error inserting question",
              error: err,
            });
          }
        });
      }
      res.status(200).json({ message: quizId });
    }
  });
});

// app.post("/add_user", (req, res) => {
//   const query =
//     "INSERT INTO student_details (`name`, `email`, `age`, `gender`) VALUES (?, ?, ?, ?)";
//   const values = [req.body.name, req.body.email, req.body.age, req.body.gender];
//   console.log(values);
//   db.query(query, values, (err, result) => {
//     return err
//       ? res.json({ message: "Something went wrong:" + err })
//       : res.json({ success: "Student added successfully" });
//   });
// });

// app.get("/students", (req, res) => {
//   const query = "SELECT * FROM student_details";
//   db.query(query, (err, result) => {
//     return err
//       ? res.json({ message: "Something went wrong:" + err })
//       : res.json(result);
//   });
// });

app.listen(5000, () => {
  console.log(`Server started on port ${PORT}`);
});
