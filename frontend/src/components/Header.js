import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

function Header() {
  const [name, setName] = useState("");
  useEffect(() => {
    fetch(`/auth/user`, {
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

  return (
    <div className="navbar">
      <div className="nav-items">
        <h1>GrowMore</h1>
      </div>
      <div className="nav-items">
        <Link to="#logout" className="link">
          {name}
        </Link>
      </div>
    </div>
  );
}

export default Header;
