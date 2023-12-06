import { db } from "./mongo";

interface FacebookPost {
  _id?: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const facebookPostsCollection = db.collection<FacebookPost>("facebookPosts");

export { facebookPostsCollection, FacebookPost };
