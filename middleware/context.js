var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const fetchuser = (req, res, next) => {
  // Get the user from the jwt token and add id to the req object
  const token = req.header("auth-token");
  // if token is not present
  if (!token) {
  return  res.status(401).send({ error: "Please provide a token" });
  }
  try {
    // or we will verify the user using jwt.verify
    const data = jwt.verify(token, JWT_SECRET);
    // to retrive the user id
    req.user = data.user;
    next();
  } catch (error) {
   return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchuser;
