import React, { useEffect, useState } from "react";
import "../../css/UpdateTask.css";
import TaskChanger from "./TaskChanger";

function UpdateTask() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch(`/task/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 0) {
          setTasks(data.data);
        } else {
          alert(data.error);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  },[]);
  return (
    <div className="update-task">
      {tasks.map((e) => {
        return <TaskChanger taskName={e.taskName} key={e._id} id={e._id} />;
      })}
    </div>
  );
}

export default UpdateTask;
