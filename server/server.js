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
  console.log(quizId);
  let query = "SELECT * FROM quizzes WHERE quiz_id = UNHEX(REPLACE(?,'-',''))";
  let query2 = `
  SELECT
    q.title as title,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'question_text', q.question_text,
            'question_type', q.question_type,
            'choices', q.choices,
            'question_order_num', q.question_order_num
        )
    ) AS questions
FROM (
    SELECT
        quizzes.title,
        questions.question_text,
        questions.question_type,
        IF(questions.question_type = 'true_false', NULL, JSON_ARRAYAGG(choices.text)) AS choices,
        questions.question_order_num
    FROM
        quizzes
    JOIN
        questions ON quizzes.quiz_id = questions.quiz_id
    LEFT JOIN
        choices ON questions.question_id = choices.question_id
    WHERE
        quizzes.quiz_id = UUID_TO_BIN(?)
    GROUP BY
        quizzes.title,
        questions.question_text,
        questions.question_type,
        questions.correct_choice,
        questions.question_order_num
    ORDER BY
        questions.question_order_num ASC
) as q
GROUP BY
    q.title;
`;

  db.query(query2, quizId, (err, result) => {
    if (err) {
      res.json({ message: "Something went wrong: " + err });
    }
    if (result.length === 0) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    const quiz = result[0];
    console.log(quiz);
    res.status(200).json(quiz);
  });
});

app.post("/answers", async (req, res) => {
  try {
    // Query correct choices by quiz id
    const quizId = req.body.quizId;
    const query = `
    SELECT
    JSON_ARRAYAGG(q.correct_choice) AS correct_choices
FROM (
    SELECT
        questions.correct_choice
    FROM
        quizzes
    JOIN
        questions ON quizzes.quiz_id = questions.quiz_id
    WHERE
        quizzes.quiz_id = UUID_TO_BIN(?)
) AS q;`;
    db.query(query, quizId, (err, result) => {
      if (err) {
        res.json({ message: "Something went wrong: " + err });
      }
      if (result.length === 0) {
        res.status(404).json({ message: "Quiz not found" });
        return;
      }
      // Build score array:
      // Correct answer - 0
      // Incorrect answer - 1
      const results = [];
      for (let i = 0; i < req.body.questionChoices.length; i++) {
        req.body.questionChoices[i] === result[0].correct_choices[i]
          ? (results[i] = 1)
          : (results[i] = 0);
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error(
      `Error fetching answers for quiz with id ${req.params.id}:`,
      error
    );
    res.status(500).json({
      message: `Error fetching answers for quiz with id ${req.params.id}:`,
      error,
    });
  }
});

app.post("/quiz", async (req, res) => {
  try {
    // Generate quiz id for quiz primary key and question foreign key
    const quizId = nodeUuid.v4();
    const binaryId = Buffer.from(quizId.replace(/-/g, ""), "hex");
    console.log(binaryId);

    // Query to post quiz
    let query = "INSERT INTO quizzes (`quiz_id`, `title`) VALUES (?, ?)";
    let values = [binaryId, req.body.title];
    await dbQuery(query, values);

    // Post questions to questions table
    for (const question of req.body.questions) {
      // Generate question id
      const questionId = Buffer.from(nodeUuid.v4().replace("-", ""), "hex");

      // Query to post question
      query =
        "INSERT INTO questions (`question_id`, `question_text`, `question_type`, `correct_choice`, `question_order_num`, `quiz_id`) VALUES (?, ?, ?, ?, ?, ?)";
      values = [
        questionId,
        question.question_text,
        question.question_type,
        question.correct_choice,
        question.question_order_num,
        binaryId,
      ];
      await dbQuery(query, values);

      // Post choices to choices table if the question is multiple choice
      if (question.question_type === "multiple_choice") {
        for (let index = 0; index < question.choices.length; index++) {
          const choice = question.choices[index];
          query =
            "INSERT INTO choices (`text`, `choice_order_num`, `question_id`) VALUES (?, ?, ?)";
          values = [choice, index, questionId];
          await dbQuery(query, values);
        }
      }
    }
    res.status(200).json({ message: quizId });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Error inserting data", error });
  }
});

function dbQuery(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

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
