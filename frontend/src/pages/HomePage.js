import React, { createContext, useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/Admin/AddTask";
import UpdateTask from "../components/Admin/UpdateTask";
import ShowTask from "../components/ShowTasks/ShowTask";

export const DataContext = createContext();

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const callApi = () => {
    fetch(`/api/task/tasks`, {
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
  };
  return (
    <div>
      <Header />
      <AddTask />
      <DataContext.Provider
        value={{
          tasks,
          callApi,
        }}
      >
        <ShowTask />
        <UpdateTask />
      </DataContext.Provider>
    </div>
  );
}

export default HomePage;
