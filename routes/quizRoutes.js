const express= require('express');
const quizRouter= express.Router();
const context = require("../middleware/context")

const quizController = require("../controller/quizController")

quizRouter.post("/create/quiz/:userId",context,quizController.createQuiz);
quizRouter.put("/publish/quiz/:quizId",context,quizController.publishQuiz);
quizRouter.delete("/delete/quiz/:quizId",context,quizController.deleteQuiz);
quizRouter.get("/getQuiz/:userId",quizController.getUserQuiz);


quizRouter.post("/add/question/:quizId",context,quizController.addQuestion);
quizRouter.get("/get/quiz/questions/:quizId",context,quizController.getQuizQuestions);
quizRouter.put("/upate/ques/:quesId",context,quizController.updateQuestion);
quizRouter.delete("/delete/question/:quesId",context,quizController.deleteQuestion);
quizRouter.get("/getPublishedQuiz/:code",quizController.getPublishedQuizQuestions)
module.exports = quizRouter
