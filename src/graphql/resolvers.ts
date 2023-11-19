import { ObjectId } from "mongodb";
import { usersCollection, User } from "../database/user";
import { tweetsCollection, Tweet } from "../database/tweet";

const resolvers = {
  hello: () => "Hello world!",

  rollDice: ({ numDice, numSides }) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
  getUsers: async () => {
    return [
      {
        _id: "1",
        username: "test",
        email: "dfd",
      },
    ];
  },

  users: async () => {
    try {
      const users = await usersCollection.find({}).toArray();
      if (!users) {
        console.error("No users found");
        throw new Error("No users found");
      }
      console.log("Fetched users:", users);
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  user: async ({ id }) => {
    try {
      const user = await usersCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!user) {
        console.error("User not found");
        throw new Error("User not found");
      }
      console.log("Fetched user:", user);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  //     // ... other query resolvers ...

  createUser: async ({ input }) => {
    console.log("user", input);
    const newUser: User = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Attempting to create user:", newUser);

    try {
      const result = await usersCollection.insertOne(newUser);
      console.log("result", result);
      if (!result.insertedId) {
        console.error("Insertion failed: No ID returned");
        throw new Error("Failed to insert user");
      }

      const createdUser = await usersCollection.findOne({
        _id: result.insertedId,
      });
      if (!createdUser) {
        console.error("Inserted user not found");
        throw new Error("Inserted user not found");
      }
      console.log("Created user:", createdUser);
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  //     // ... other mutation resolvers ...
};

export default resolvers;
