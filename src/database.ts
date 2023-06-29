import { ObjectId } from "mongoose";

export interface PostData {
  _id: ObjectId;
  postContent: string;
  likeCount: number;
}

export interface CommentData {
  _id: ObjectId;
  commentContent: string;
  postId: ObjectId;
}
