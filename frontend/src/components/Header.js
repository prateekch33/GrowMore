import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Header.css";

function Header() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 0) {
          setName(data.name);
        } else {
          alert(data.error);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-items">
        <h1>GrowMore</h1>
      </div>
      <div className="nav-items">
        <Link to="/" className="link" onClick={() => logout()}>
          {name}
        </Link>
      </div>
    </div>
  );
}

export default Header;
