exports.createQuizQuery = "INSERT INTO QUIZ_DTLS (QUIZ_ID, PUBLISHED, USER_ID) VALUES (?, ?, ?)";

exports.publishQuizQuery = `
  UPDATE QUIZ_DTLS
  SET PUBLISHED=?, CODE=?
  WHERE QUIZ_ID=?
`;

exports.deleteQuizQuery = `
  DELETE FROM QUIZ_DTLS
  WHERE QUIZ_ID=?
`;

exports.createQuestion = `
  INSERT INTO QUIZ_QUESTIONS
  SET QUES_ID=?, QUES_DESCREPTION=?, QUES_TYPE=?, OPTION1=?, OPTION2=?, OPTION3=?, OPTION4=?, ANSWER=?, QUIZ_ID=?
`;

exports.getUserQuizQuery = `
  SELECT *
  FROM QUIZ_DTLS
  WHERE USER_ID=?
`;

exports.getQuizQuestionsQuery = `
  SELECT QUES_ID AS quesId, QUES_DESCREPTION AS quesDescreption, QUES_TYPE AS ques_type,
    OPTION1 AS option1, OPTION2 AS option2, OPTION3 AS option3, OPTION4 AS option4, ANSWER AS answer
  FROM QUIZ_QUESTIONS
  WHERE QUIZ_ID=?
`;

exports.updateQuestionQuery = `
  UPDATE QUIZ_QUESTIONS
  SET QUES_DESCREPTION=?, QUES_TYPE=?, OPTION1=?, OPTION2=?, OPTION3=?, OPTION4=?, ANSWER=?
  WHERE QUES_ID=?
`;

exports.deleteQuestionQuery = `
  DELETE FROM QUIZ_QUESTIONS
  WHERE QUES_ID=?
`;

exports.getPublishedQuizQuestions = `
  SELECT QUES_ID AS quesId, QUES_DESCREPTION AS quesDescreption, QUES_TYPE AS ques_type,
    OPTION1 AS option1, OPTION2 AS option2, OPTION3 AS option3, OPTION4 AS option4, ANSWER AS answer
  FROM QUIZ_QUESTIONS
  WHERE QUIZ_ID=(
    SELECT QUIZ_ID
    FROM QUIZ_DTLS
    WHERE CODE=? AND PUBLISHED=1
  )
`;
