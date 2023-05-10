import mongoose from "mongoose";

const task = mongoose.Schema({
  taskName: String,
  dateCreated: String,
});

const tasks = mongoose.model("TasksDetails", task);
export default tasks;
