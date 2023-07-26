import { ObjectId } from "mongoose";

export interface PostData {
  _id: ObjectId;
  postTitle: string;
  postContent: string;
  upvoteCount: number;
  userId: ObjectId;
}

export interface CommentData {
  _id: ObjectId;
  commentContent: string;
  postId: ObjectId;
}

export interface UserData {
  _id: ObjectId;
  password: string;
  email: string;
  username: string;
  likedPosts: Array<ObjectId>;
}
