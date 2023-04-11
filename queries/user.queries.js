// Create a user
exports.createUserQuery = "INSERT INTO USER_DTLS SET USER_ID=?,USER_NAME=? ,EMAIL_ADDRESS=? ,PASSWORD=?,CREATED_AT=?"

exports.getUserQuery = "SELECT USER_ID as userId,USER_NAME as name,EMAIL_ADDRESS as emailAddress,PASSWORD as passcode FROM USER_DTLS WHERE EMAIL_ADDRESS=?"