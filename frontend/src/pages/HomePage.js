import React, { createContext, useEffect, useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/Admin/AddTask";
import UpdateTask from "../components/Admin/UpdateTask";
import ShowTask from "../components/ShowTasks/ShowTask";
import { useNavigate } from "react-router-dom";

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
      });
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/");
    }
  },[]);
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
