import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostData } from "../database";
import "./styles/postStyles.css";
import mongoose from "mongoose";
import { useCookies } from "react-cookie";

export default function PostPage() {
  const [userLiked, setUserLiked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [likedPosts, setLikedPosts] = useState([""]);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [cookies, removeCookies] = useCookies(["token"]);
  const [postData, setPostData] = useState({
    _id: "",
    postTitle: "",
    postContent: "",
    userId: new mongoose.Types.ObjectId(),
  });
  const { id } = useParams();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setLoggedIn(false);
      } else {
        console.log("cookie token" + cookies.token);
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
          const status = res.status;
          if (status) {
            setUsername(res.user);
            setUserId(res._id);
            setLoggedIn(true);
            setLikedPosts(res.likedPosts);
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
    fetch("http://localhost:3000/post/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPostData(data);
        setUpvoteCount(data.upvoteCount);
      });
  }, [id]);

  useEffect(() => {
    console.log(likedPosts);
    if (likedPosts.includes(postData._id)) {
      setUserLiked(true);
    } else {
      setUserLiked(false);
    }
  }, [likedPosts, postData._id]);

  async function handleUpvote() {
    console.log(userLiked);
    let data = { userId: userId, postId: postData._id };
    if (!loggedIn) {
      window.location.href = "/login";
    } else if (!userLiked) {
      setUserLiked(true);
      console.log(userLiked);
      setUpvoteCount(upvoteCount + 1);
      console.log("userId" + userId);
      await fetch("http://localhost:3000/upvotePost", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(upvoteCount);
    } else {
      setUserLiked(false);
      setUpvoteCount(upvoteCount - 1);
      await fetch("http://localhost:3000/downvotePost", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(upvoteCount);
    }
  }

  return (
    <div className="postPageContainer">
      <div className="contentContainer">
        <div className="originalPost">
          {!userLiked && (
            <button className="upvote-button" onClick={handleUpvote}>
              <div className="upvote-count">{upvoteCount}</div>
            </button>
          )}
          {userLiked && (
            <button className="upvote-button-liked" onClick={handleUpvote}>
              <div className="upvote-count-liked">{upvoteCount}</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
