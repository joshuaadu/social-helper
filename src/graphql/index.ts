import { buildSchema } from "graphql";
import { ObjectId } from "mongodb";
import { usersCollection, User } from "../database/user";
import { tweetsCollection, Tweet } from "../database/tweet"; 

export const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
    provider: String!
    providerId: String!
    createdAt: String!
    updatedAt: String!
  }

  type Tweet {
    id: ID!
    content: String!
    authorId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    hello: String
    users: [User]
    user(id: ID!): User
    tweets: [Tweet]
    tweet(id: ID!): Tweet
  }

  type Mutation {
    createUser(username: String!, email: String!, provider: String!, providerId: String!): User
    updateUser(id: ID!, username: String, email: String): User
    createTweet(content: String!, authorId: ID!): Tweet
    updateTweet(id: ID!, content: String): Tweet
  }
`);

export const root = {
  hello: () => {
    return "Hello world!";
  },
  users: async () => {
    return await usersCollection.find({}).toArray();
  },
  user: async ({ id }) => {
    return await usersCollection.findOne({ _id: new ObjectId(id) as any });
  },
  tweets: async () => {
    return await tweetsCollection.find({}).toArray();
  },
  tweet: async ({ id }) => {
    return await tweetsCollection.findOne({ _id: new ObjectId(id) as any });
  },
  createUser: async ({ username, email, provider, providerId }) => {
    const newUser: User = {
      username,
      email,
      provider,
      providerId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await usersCollection.insertOne(newUser);
    return await usersCollection.findOne({ _id: result.insertedId });
  },
  updateUser: async ({ id, username, email }) => {
    const updateData: Partial<User> = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    updateData.updatedAt = new Date();

    await usersCollection.updateOne({ _id: new ObjectId(id) as any }, { $set: updateData });
    return await usersCollection.findOne({ _id: new ObjectId(id) as any });
  },
  createTweet: async ({ content, authorId }) => {
    const newTweet: Tweet = {
      content,
      authorId: new ObjectId(authorId),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await tweetsCollection.insertOne(newTweet);
    return await tweetsCollection.findOne({ _id: result.insertedId });
  },
  updateTweet: async ({ id, content }) => {
    const updateData: Partial<Tweet> = {};
    if (content) updateData.content = content;
    updateData.updatedAt = new Date();

    await tweetsCollection.updateOne({ _id: new ObjectId(id) as any }, { $set: updateData });
    return await tweetsCollection.findOne({ _id: new ObjectId(id) as any });
  },
  // ... other resolvers ...
};
