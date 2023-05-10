import React, { useEffect, useState } from "react";
import "../../css/Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (login === 1) {
      fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 0) {
            localStorage.setItem("authToken", `Bearer ${data.token}`);
            navigate("/admin");
          } else {
            alert(data.error);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [login, navigate, email, password]);
  return (
    <div className="login">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
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
            onClick={() => setLogin(1)}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
