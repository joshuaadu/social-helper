import { db } from './mongo';

interface User {
  _id?: string;
  username: string;
  email: string;
  provider: string;
  providerId: string;
  createdAt: Date;
  updatedAt: Date;
}

const usersCollection = db.collection<User>('users');

export { usersCollection, User };