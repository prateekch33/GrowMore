import React, { useEffect, useState } from "react";
import "../../css/UpdateTask.css";

function TaskChanger(props) {
  const [taskName, setTaskName] = useState(props.taskName);
  const [update, setUpdate] = useState("");
  const [deleteTask, setDeleteTask] = useState("");
  useEffect(() => {
    if (deleteTask !== "") {
      fetch(`/task/deleteTask/?taskid=${deleteTask}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 0) {
            alert("Task Deleted Successfully");
          } else {
            alert(data.error);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } else if (update !== "") {
      fetch(`/task/updatetask/?taskid=${update}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskName }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 0) {
            alert("Task Updated");
          } else {
            alert(data.error);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [update, deleteTask, taskName]);
  return (
    <div className="form">
      <div className="form-field">
        <input
          className="form-input"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        ></input>
      </div>
      <div className="form-field">
        <button
          className="form-button"
          type="submit"
          style={{ backgroundColor: "#50db0a" }}
          onClick={() => setUpdate(props.id)}
        >
          Update
        </button>
      </div>
      <div className="form-field">
        <button
          className="form-button"
          type="submit"
          style={{ backgroundColor: "#d30b0b" }}
          onClick={() => setDeleteTask(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskChanger;
