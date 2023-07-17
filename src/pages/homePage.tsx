import React, { useEffect, useState } from "react";
import "./styles/homeStyles.css";
import PostCard from "../components/postCard";
import { PostData } from "../database";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPostsData(data);
      });
  }, []);

  return (
    <div className="homeContainer">
      <div className="postsContainer">
        <div className="posts-header">
          <div className="header-top-container">
            <div className="header-text">Popular Prompts</div>
            <button className="new-post">Submit Prompt</button>
          </div>
        </div>
        {postsData.map((post: PostData) => (
          <PostCard props={post}></PostCard>
        ))}
      </div>
    </div>
  );
}
