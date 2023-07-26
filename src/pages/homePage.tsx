import React, { useEffect, useState } from "react";
import "./styles/homeStyles.css";
import PostCard from "../components/postCard";
import { PostData } from "../database";
import { Cookies, useCookies } from "react-cookie";

export default function HomePage() {
  const [postsData, setPostsData] = useState([]);
  const [username, setUsername] = useState("");
  const [cookies, removeCookies] = useCookies(["token"]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setLoggedIn(false);
      } else {
        console.log("home page cookie" + cookies.token);
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
  }, [cookies, loggedIn]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPostsData(data);
      });
  }, []);

  function handleSubmitPrompt() {
    if (!loggedIn) {
      window.location.href = "/login";
    } else {
      window.location.href = "/newpost";
    }
  }

  return (
    <div className="homeContainer">
      <div className="postsContainer">
        <div className="posts-header">
          <div className="header-top-container">
            <div className="header-text">Popular Prompts</div>
            <button className="new-post" onClick={handleSubmitPrompt}>
              Submit Prompt
            </button>
          </div>
        </div>
        {postsData.map((post: PostData) => (
          <PostCard props={post}></PostCard>
        ))}
      </div>
    </div>
  );
}
