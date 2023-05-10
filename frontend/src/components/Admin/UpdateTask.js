import React, { useContext } from "react";
import "../../css/UpdateTask.css";
import TaskChanger from "./TaskChanger";
import { DataContext } from "../../pages/HomePage";

function UpdateTask() {
  const { tasks } = useContext(DataContext);

  return (
    <div className="update-task">
      {tasks.map((e) => {
        return <TaskChanger taskName={e.taskName} key={e._id} id={e._id} />;
      })}
    </div>
  );
}

export default UpdateTask;
