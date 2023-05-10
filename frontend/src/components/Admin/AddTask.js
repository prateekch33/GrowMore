import React, { useEffect, useState } from "react";
import "../../css/AddTask.css";

function AddTask() {
  const [taskName, setTaskName] = useState("");
  const [submit, setSubmit] = useState(0);
  useEffect(() => {
    if (submit === 1) {
      fetch(`/api/task/addtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskName }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 0) {
            alert("Task Added Successfully");
          } else {
            alert(data.error);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [submit, taskName]);
  return (
    <div className="add-task">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-field">
          <input
            className="form-input"
            type="text"
            placeholder="Enter new task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          ></input>
        </div>
        <div className="form-field">
          <button
            type="submit"
            className="form-button"
            onClick={() => setSubmit(1)}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
