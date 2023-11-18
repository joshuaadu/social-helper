import { db } from './mongo';
import { ObjectId } from 'mongodb';

interface Tweet {
  _id?: ObjectId;
  content: string;
  authorId: ObjectId; // Reference to User's ObjectId
  createdAt: Date;
  updatedAt: Date;
}

const tweetsCollection = db.collection<Tweet>('tweets');

export { tweetsCollection, Tweet };
