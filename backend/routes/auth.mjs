import express from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import users from "../models/users.mjs";
import bcrypt from "bcryptjs";
import jwtVerify from "../middlewares/jwtVerify.mjs";
const auth = express.Router();

auth.post("/register", async (req, res) => {
  var { name, email, password } = req.body;
  var date = new Date();
  var dateCreated = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  var passwordHash = "";
  await bcrypt
    .genSalt(10)
    .then(async (salt) => {
      await bcrypt
        .hash(password, salt)
        .then((hash) => {
          passwordHash = hash;
        })
        .catch((err) => {
          res.status(401);
          console.log(err.message);
          throw new Error(`${err.message}`);
        });
    })
    .catch((err) => {
      res.status(400);
      throw new Error("Hash not created");
    });

  let data = new users({
    name: name,
    email: email,
    password: passwordHash,
    dateCreated: dateCreated,
  });

  await data
    .save()
    .then(() => {
      return res.status(200).json({ status: 0 });
    })
    .catch((err) => {
      res.status(400);
      throw new Error("Registration not successful");
    });
});

auth.post("/login", async (req, res) => {
  var { email, password } = req.body;
  await users
    .findOne({ email: email })
    .then(async (result) => {
      bcrypt
        .compare(password, result.password)
        .then((isMatch) => {
          if (isMatch) {
            let data = { id: result._id };
            let token = jwt.sign(data, process.env.JWT_TOKEN);
            return res.status(200).json({ status: 0, token });
          } else {
            res.status(400);
            throw new Error("Incorrect Password!! Try again.");
          }
        })
        .catch((err) => {
          res.status(401);
          throw new Error(err.message);
        });
    })
    .catch((err) => {
      res.status(400);
      throw new Error("Username Incorrect!! Try Again.");
    });
});

auth.get("/user", jwtVerify, async (req, res) => {
  var userId = req.userid;
  await users
    .findOne({ _id: userId })
    .then((result) => {
      return res.status(200).json({ status: 0, name: result.name });
    })
    .catch((err) => {
      res.status(400);
      throw new Error("Unable to Verify User!!");
    });
});

export default auth;
