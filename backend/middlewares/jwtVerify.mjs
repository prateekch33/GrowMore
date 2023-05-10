import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtVerify = (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decodedId = jwt.verify(token, process.env.JWT_TOKEN);
      req.userid = decodedId.id;
      next();
    } catch (err) {
      res.status(401);
      console.log(err);
      throw new Error("User Not Authorized");
    }
  }

  if (!token) { 
    res.status(401);
    throw new Error("Token Not Found");
  }
};

export default jwtVerify;
