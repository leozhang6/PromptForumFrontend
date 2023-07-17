import React, { useState, useEffect } from "react";
import { useCookies, Cookies } from "react-cookie";

import "./styles/headerStyles.css";

export default function PageHeader() {
  const [username, setUsername] = useState("");
  const [cookies, removeCookies] = useCookies(["token"]);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setLoggedIn(false);
      } else {
        console.log(cookies.token);
      }
      await fetch("http://localhost:3000/", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          console.log(res.status);
          const status = res.status;
          if (status) {
            setUsername(res.user);
            console.log(username);
            setLoggedIn(true);
          } else {
            setUsername("");
            setLoggedIn(false);
          }
          return status;
        });
      console.log(loggedIn);
    };
    verifyCookie();
  }, [cookies]);

  function handleLogout() {
    removeCookies("token", null);
    window.location.href = "/login";
  }

  return (
    <div className="headerContainer">
      <div className="homeButton" onClick={() => (window.location.href = "/")}>
        <a className="ai">AI</a>
        <a className="prompts">Prompts</a>
      </div>
      {loggedIn && (
        <div className="buttonContainer">
          <div className="navButton">{username}</div>
          <div className="navButton">settings</div>
          <div className="navButton">help</div>
          <div onClick={() => handleLogout()} className="navButton">
            sign out
          </div>
        </div>
      )}
      {!loggedIn && (
        <div className="buttonContainer">
          <div
            onClick={() => (window.location.href = "/login")}
            className="navButton"
          >
            sign in
          </div>
          <div className="navButton">settings</div>
          <div className="navButton">help</div>
        </div>
      )}
    </div>
  );
}
