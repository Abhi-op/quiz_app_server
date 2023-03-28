const express= require('express');
const quizRouter= express.Router();

const quizController = require("../controller/quizController")

quizRouter.post("/create/quiz/:userId",quizController.createQuiz);
quizRouter.put("/publish/quiz/:quizId",quizController.publishQuiz);
quizRouter.delete("/delete/quiz/:quizId",quizController.deleteQuiz);