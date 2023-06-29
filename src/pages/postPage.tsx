import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/postStyles.css";

export default function PostPage() {
  const { id } = useParams();
  useEffect(() => {});

  return (
    <div className="postPageContainer">
      <div className="contentContainer">
        <div className="originalPost">{id}</div>
      </div>
    </div>
  );
}
