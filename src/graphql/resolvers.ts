import { ObjectId } from "mongodb";
import { usersCollection, User } from "../database/user";
import { tweetsCollection, Tweet } from "../database/tweet";
import { facebookPostsCollection, FacebookPost } from "../database/facebookPost";
import { instagramPostsCollection, InstagramPost } from "../database/instagramPost";

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
        email: "email@example.com",
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

  createUser: async ({ input }) => {
    console.log("Creating user", input);
    const newUser: User = {
      ...input,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const result = await usersCollection.insertOne(newUser);
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

  // Facebook Post Resolvers
  facebookPosts: async () => {
    try {
      const posts = await facebookPostsCollection.find({}).toArray();
      if (!posts) {
        console.error("No Facebook posts found");
        throw new Error("No Facebook posts found");
      }
      return posts;
    } catch (error) {
      console.error("Error fetching Facebook posts:", error);
      throw error;
    }
  },

  facebookPost: async ({ id }) => {
    try {
      const post = await facebookPostsCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!post) {
        console.error("Facebook post not found");
        throw new Error("Facebook post not found");
      }
      return post;
    } catch (error) {
      console.error("Error fetching Facebook post:", error);
      throw error;
    }
  },

  createFacebookPost: async ({ content, authorId }) => {
    const authorObjectId = new ObjectId(authorId);
    const user = await usersCollection.findOne({
      _id: authorObjectId as any,
    });

    if (!user) {
      console.error("Author not found");
      throw new Error("Author not found");
    }

    const newPost: FacebookPost = {
      authorId,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const result = await facebookPostsCollection.insertOne(newPost);
      if (!result.insertedId) {
        console.error("Insertion failed: No ID returned");
        throw new Error("Failed to insert Facebook post");
      }

      return await facebookPostsCollection.findOne({
        _id: result.insertedId,
      });
    } catch (error) {
      console.error("Error creating Facebook post:", error);
      throw error;
    }
  },

  // Instagram Post Resolvers
  instagramPosts: async () => {
    try {
      const posts = await instagramPostsCollection.find({}).toArray();
      if (!posts) {
        console.error("No Instagram posts found");
        throw new Error("No Instagram posts found");
      }
      return posts;
    } catch (error) {
      console.error("Error fetching Instagram posts:", error);
      throw error;
    }
  },

  instagramPost: async ({ id }) => {
    try {
      const post = await instagramPostsCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!post) {
        console.error("Instagram post not found");
        throw new Error("Instagram post not found");
      }
      return post;
    } catch (error) {
      console.error("Error fetching Instagram post:", error);
      throw error;
    }
  },

  createInstagramPost: async ({ imageUrl, caption, authorId }) => {
    const authorObjectId = new ObjectId(authorId);
    const user = await usersCollection.findOne({
      _id: authorObjectId as any,
    });

    if (!user) {
      console.error("Author not found");
      throw new Error("Author not found");
    }

    const newPost: InstagramPost = {
      authorId,
      imageUrl,
      caption,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const result = await instagramPostsCollection.insertOne(newPost);
      if (!result.insertedId) {
        console.error("Insertion failed: No ID returned");
        throw new Error("Failed to insert Instagram post");
      }

      return await instagramPostsCollection.findOne({
        _id: result.insertedId,
      });
    } catch (error) {
      console.error("Error creating Instagram post:", error);
      throw error;
    }
  },

  // Tweet Resolvers
  tweets: async () => {
    try {
      const tweets = await tweetsCollection.find({}).toArray();
      if (!tweets) {
        console.error("No tweets found");
        throw new Error("No tweets found");
      }
      return tweets;
    } catch (error) {
      console.error("Error fetching tweets:", error);
      throw error;
    }
  },

  tweet: async ({ id }) => {
    try {
      const tweet = await tweetsCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!tweet) {
        console.error("Tweet not found");
        throw new Error("Tweet not found");
      }
      return tweet;
    } catch (error) {
      console.error("Error fetching tweet:", error);
      throw error;
    }
  },

  createTweet: async ({ content, authorId }) => {
    const authorObjectId = new ObjectId(authorId);
    const user = await usersCollection.findOne({
      _id: authorObjectId as any,
    });

    if (!user) {
      console.error("Author not found");
      throw new Error("Author not found");
    }

    const newTweet: Tweet = {
      authorId,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const result = await tweetsCollection.insertOne(newTweet);
      if (!result.insertedId) {
        console.error("Insertion failed: No ID returned");
        throw new Error("Failed to insert tweet");
      }
  
      return await tweetsCollection.findOne({
        _id: result.insertedId,
      });
    } catch (error) {
      console.error("Error creating tweet:", error);
      throw error;
    }
  },

  // ... other mutation resolvers ...
};

export default resolvers;

