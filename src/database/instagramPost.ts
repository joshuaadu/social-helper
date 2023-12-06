import { db } from "./mongo";

interface InstagramPost {
  _id?: string;
  authorId: string;
  imageUrl: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
}

const instagramPostsCollection = db.collection<InstagramPost>("instagramPosts");

export { instagramPostsCollection, InstagramPost };
