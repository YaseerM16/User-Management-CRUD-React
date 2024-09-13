import jwt from "jsonwebtoken";
// import { JWT_KEY } from "../utils/config.js";
// const key = process.env.JWT_KEY;

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  console.log("Request of AuthToken :", token);

  if (!token) {
    return res.send({ failToken: true, cookieObj: token });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);

    req.user = verified;

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}

export default authenticateToken;
