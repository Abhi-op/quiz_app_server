exports.createQuizQuery = "INSERT INTO QUIZ_DTLS SET QUIZ_ID=?,PUBLISHED=?,USER_ID=?"

exports.publishQuizQuery = "UPDATE QUIZ_DTLS SET PUBLISHED=?, CODE=?, WHERE QUIZ_ID=?"


exports.deleteQuizQuery = " DELETE FROM QUIZ_DTLS WHERE QUIZ_ID=?"


exports.createQuestion = "INSERT INTO QUIZ_QUESTIONS SET QUES_ID=?,QUES_DESCREPTION=?,QUES_TYPE=?,OPTION1=?,OPTION1=?,OPTION3=?,OPTION4=?,ANSWER=?,QUIZ_ID=?"

exports.getUserQuizQuery = "SELECT * FROM QUIZ_DTLS WHERE USER_ID=? "

exports.getQuizQuestionsQuery = "SELECT QUES_ID as quesId,QUES_DESCREPTION as quesDescreption,QUES_TYPE as ques_type,OPTION1 as option1 ,OPTION2 as option2, OPTION3 as option3 , OPTION4 as option4, ANSWER as answer FROM QUIZ_QUESTIONS WHERE QUIZ_ID =?"
 
exports.updateQuestionQuery = "UPDATE QUIZ_QUESTIONS SET QUES_DESCREPTION=?,QUES_TYPE=?,OPTION1=?,OPTION2=?,OPTION3 = ?,OPTION4 = ?,ANSWER = ? WHERE QUES_ID=?  "
exports.deleteQuestionQuery = "DELETE FROM QUIZ_QUESTIONS WHERE QUES_ID = ?"

exports.getPublishedQuizQuestions = "SELECT QUES_ID as quesId,QUES_DESCREPTION as quesDescreption,QUES_TYPE as ques_type,OPTION1 as option1 ,OPTION2 as option2, OPTION3 as option3 , OPTION4 as option4, ANSWER as answer FROM QUIZ_QUESTIONS WHERE QUIZ_ID =(SELECT QUIZ_ID FROM QUIZ_DTLS WHERE CODE=? AND PUBLISHED=1)"
 