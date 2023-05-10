import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./backend/db.mjs";
import { errorHandler, notFound } from "./backend/middlewares/errorhandler.mjs";
import auth from "./backend/routes/auth.mjs";
import tasksAdd from "./backend/routes/tasksAdd.mjs";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT;
connect();

app.get("/", (req, res) => {
  res.send("API Working Successfully!!");
});

app.use("/auth", auth);
app.use("/task", tasksAdd);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
