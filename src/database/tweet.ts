import { db } from './mongo';

interface Tweet {
  _id?: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const tweetsCollection = db.collection<Tweet>('tweets');

export { tweetsCollection, Tweet };
