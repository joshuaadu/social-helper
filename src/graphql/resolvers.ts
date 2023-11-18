import { ObjectId } from 'mongodb';
import { usersCollection, User } from '../database/user'; // Adjust import paths as needed
import { tweetsCollection, Tweet } from '../database/tweet'; // Adjust import paths as needed

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    users: async () => {
        try {
          const users = await usersCollection.find({}).toArray();
          return users;
        } catch (error) {
          console.error("Error fetching users:", error);
          return null;
        }
    },
    user: async ({ id }) => await usersCollection.findOne({ _id: new ObjectId(id) as any }),
    tweets: async () => await tweetsCollection.find({}).toArray(),
    tweet: async ({ id }) => await tweetsCollection.findOne({ _id: new ObjectId(id) as any }),
  },
  Mutation: {
    createUser: async (_, { username, email, provider, providerId }) => {
        console.log("Attempting to create user:", { username, email, provider, providerId });
        const newUser: User = { username, email, provider, providerId, createdAt: new Date(), updatedAt: new Date() };
        try {
          const result = await usersCollection.insertOne(newUser);
          console.log("User insert result:", result);
  
          if (result.insertedId) {
            const createdUser = await usersCollection.findOne({ _id: result.insertedId });
            console.log("Created user:", createdUser);
            return createdUser;
          } else {
            console.log("Insertion returned no ID, user not created.");
            return null;
          }
        } catch (error) {
          console.error("Error creating user:", error);
          return null;
        }
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
      const newTweet: Tweet = { content, authorId: new ObjectId(authorId), createdAt: new Date(), updatedAt: new Date() };
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
  },
};

export default resolvers;
