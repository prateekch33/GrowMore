import React from "react";

function Task(props) {
  return (
    <div className="task">
      <span className="task-detail">{props.taskName}</span>
    </div>
  );
}

export default Task;
