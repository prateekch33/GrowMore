import React, { useEffect, useState } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const body = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const register = {
  display: "flex",
  alignItems: "flex-end",
  cursor: "pointer",
};

function AdminPage() {
  const [view, setView] = useState(0);
  const [task, setTask] = useState("Login");
  useEffect(() => {
    if (view === false && task === "Login") {
      setTask("Register");
    } else if (view === true && task === "Register") {
      setTask("Login");
    }
  }, [view, task]);
  return (
    <div style={body}>
      {view === false ? <Login /> : <Signup />}
      <span style={register} onClick={() => setView(!view)}>
        Don't have a Account? {task} Here
      </span>
    </div>
  );
}

export default AdminPage;
