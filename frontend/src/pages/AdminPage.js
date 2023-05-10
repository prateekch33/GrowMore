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
  const [view, setView] = useState(false);
  const [task, setTask] = useState("Already have an account? Login Here");
  useEffect(() => {
    if (view === false && task === "Already have an account? Login Here") {
      setTask("Don't have a Account? Register Here");
    } else if (
      view === true &&
      task === "Don't have a Account? Register Here"
    ) {
      setTask("Already have an account? Login Here");
    }
  }, [view, task]);
  return (
    <div style={body}>
      {view === false ? <Login /> : <Signup />}
      <span style={register} onClick={() => setView(!view)}>
        {task}
      </span>
    </div>
  );
}

export default AdminPage;
