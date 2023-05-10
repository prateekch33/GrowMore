import React, { useEffect, useState } from "react";
import "../../css/Login.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (register === 1) {
      fetch(`/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "name": name, "email": email, "password": password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 0) {
            alert("Registration Successful!!");
            navigate("/");
          } else {
            alert(data.error);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [register, navigate, name, email, password]);
  return (
    <div className="login">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-field">
          <input
            type="text"
            className="form-input"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-field">
          <input
            type="email"
            className="form-input"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-field">
          <input
            type="password"
            className="form-input"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="form-field">
          <button
            className="form-button"
            type="submit"
            onClick={() => setRegister(1)}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
