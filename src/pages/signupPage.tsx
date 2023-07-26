import React, { useState } from "react";
import "./styles/signupStyles.css";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function handleEmailChange(e: any) {
    setEmail(e.target.value);
    console.log(e.target.value);
  }
  function handlePasswordChange(e: any) {
    setPassword(e.target.value);
  }
  function handleUserChange(e: any) {
    setUsername(e.target.value);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const data = { password: password, email: email, username: username };
    console.log(data);
    try {
      await fetch("http://localhost:3000/signup", {
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
            console.log("successfully signed up");
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
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-header">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div>
              <input
                placeholder="username"
                className="input-field"
                type="text"
                id="name"
                value={username}
                onChange={handleUserChange}
              />
            </div>
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
              Sign Up
            </button>
          </div>
        </form>
        <span
          className="login-prompt"
          onClick={() => (window.location.href = "/login")}
        >
          Already have an account? Click here to login.
        </span>
      </div>
    </div>
  );
}
