import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./backend/db.mjs";
import { errorHandler, notFound } from "./backend/middlewares/errorhandler.mjs";
import auth from "./backend/routes/auth.mjs";
import tasksAdd from "./backend/routes/tasksAdd.mjs";
import path from "path";
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT;
connect();

// app.get("/", (req, res) => {
//   res.send("API Working Successfully!!");
// });
app.use("/api/auth", auth);
app.use("/api/task", tasksAdd);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.resolve("./", "frontend", "build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve("./", "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
