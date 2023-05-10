import React, { useContext, useEffect } from "react";
import Task from "./Task";
import { DataContext } from "../../pages/HomePage";

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
  const { tasks, callApi } = useContext(DataContext);
  useEffect(() => {
    callApi();
  }, [callApi]);

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
