import React, { useEffect, useState } from "react";
import Task from "./Task";

const showTask = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  padding: "2%",
  margin: "2%",
  border: "2px solid #000",
  borderRadius: "15px",
};

function ShowTask() {
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
  });

  return (
    <div style={showTask}>
      {tasks.map((e) => {
        return (
          <Task key={e._id} taskName={e.taskName} dateCreated={e.dateCreated} />
        );
      })}
    </div>
  );
}

export default ShowTask;
