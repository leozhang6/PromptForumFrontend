import React, { useState } from "react";
import "./styles/loginStyles.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  function handleEmailChange(e: any) {
    setEmail(e.target.value);
    console.log(e.target.value);
  }
  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const data = { password: password, email: email };
    console.log(data);
    try {
      await fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          const { success, message } = res;
          if (success) {
            console.log("successfully logged in");
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          } else {
            console.log("failed to sign up");
          }
        });
    } catch (error) {
      console.log(error);
    }
    setEmail("");
    setPassword("");
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-header">Welcome back</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div>
              <input
                placeholder="email"
                className="input-field"
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <input
                placeholder="password"
                className="input-field"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              className="submit-button"
              type="submit"
              onClick={handleSubmit}
            >
              Log in
            </button>
          </div>
        </form>
        <span
          className="new-prompt"
          onClick={() => (window.location.href = "/signup")}
        >
          New here? Create an account.
        </span>
      </div>
    </div>
  );
}
