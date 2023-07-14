import React, { useEffect, useState } from "react";
import "./styles/postCardStyles.css";
import { PostData } from "../database";
import { Link } from "react-router-dom";

export default function PostCard({ props }: { props: PostData }) {
  return (
    <div className="postcard-container">
      <div
        className="post-title"
        onClick={() => (window.location.href = "/post:" + props._id)}
      >
        {props.postTitle}
      </div>
    </div>
  );
}
