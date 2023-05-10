import mongoose from "mongoose";

const user = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dateCreated: String,
});

const users = mongoose.model("UserDetails", user);
export default users;
