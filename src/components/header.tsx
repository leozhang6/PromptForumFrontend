import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import "./styles/headerStyles.css";

export default function PageHeader() {
  return (
    <div className="headerContainer">
      <div className="homeButton" onClick={() => (window.location.href = "/")}>
        <a className="ai">AI</a>
        <a className="prompts">Prompts</a>
      </div>
      <div className="buttonContainer">
        <div className="navButton">profile</div>
        <div className="navButton">settings</div>
        <div className="navButton">help</div>
      </div>
    </div>
  );
}
