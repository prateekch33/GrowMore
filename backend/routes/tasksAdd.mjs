import express from "express";
import tasks from "../models/tasks.mjs";
const tasksAdd = express.Router();

tasksAdd.post("/addtask", async (req, res) => {
  var taskName = req.body.task;
  var date = new Date();
  var dateCreated = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  let data = new tasks({
    taskName: taskName,
    dateCreated: dateCreated,
  });
  await data
    .save()
    .then(() => {
      return res.status(200).json({ status: 0 });
    })
    .catch((err) => {
      res.status(400);
      throw new Error("Task not added!!");
    });
});

tasksAdd.get("/tasks", async (req, res) => {
  await tasks
    .find({})
    .then((result) => {
      return res.status(200).json({ status: 0, data: result });
    })
    .catch((err) => {
      res.status(400);
      throw new Error("Unable to fetch Tasks!!");
    });
});

tasksAdd.put("/updatetask", async (req, res) => {
  var taskId = req.query.taskid;
  var taskName = req.body.task;
  var date = new Date();
  var dateUpdated = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  let data = {
    taskName: taskName,
    dateCreated: dateUpdated,
  };

  await tasks
    .findOneAndUpdate({ _id: taskId }, data)
    .then((result) => {
      return res.status(200).json({
        status: 0,
      });
    })
    .catch((err) => {
      res.status(400);
      throw new Error("Tasks not Updated!!");
    });
});

tasksAdd.delete("/deletetask", async (req, res) => {
  var taskId = req.query.taskid;
  await tasks
    .findOneAndDelete({ _id: taskId })
    .then((result) => {
      return res.status(200).json({ status: 0 });
    })
    .catch((err) => {
      res.status(400);
      throw new Error("Task not Deleted!!");
    });
});

export default tasksAdd;
