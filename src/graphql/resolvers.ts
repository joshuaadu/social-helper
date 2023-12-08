import { ObjectId, Filter } from "mongodb";
import * as createError from "http-errors";
import { usersCollection, User } from "../database/user";
import { tweetsCollection, Tweet } from "../database/tweet";
import {
  facebookPostsCollection,
  FacebookPost,
} from "../database/facebookPost";
import {
  instagramPostsCollection,
  InstagramPost,
} from "../database/instagramPost";
// import { validate } from "graphql";
import {
  createPostSchema,
  createInstagramPostSchema,
  createUserSchema,
  validate,
} from "../lib/validations";

// import { create } from "domain";

// const { HttpError } = createError;

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
        console.log("No users found");
        throw createError(404, "No users found");
      }
      return users;
    } catch (error) {
      console.log("Error getting users", error);
      throw error;
    }
  },

  user: async ({ id }) => {
    try {
      const user = await usersCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!user) {
        // console.log("User not found");
        throw createError(404, "User not found");
      }
      return user;
    } catch (error) {
      console.log("Error getting user", error);
      throw error;
    }
  },

  createUser: async ({ input }) => {
    try {
      const value = validate(createUserSchema, input);
      // console.log("Creating user", input);
      const newUser: User = {
        ...value,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await usersCollection.insertOne(newUser);
      if (!result.insertedId) {
        // console.log("Failed to insert user");
        throw createError(400, "Failed to insert user");
      }

      const createdUser = await usersCollection.findOne({
        _id: result.insertedId,
      });
      if (!createdUser) {
        // console.log("Inserted user not found");
        throw createError(404, "Inserted user not found");
      }
      return createdUser;
    } catch (error) {
      console.log("Error creating user", error);
      throw error;
    }
  },

  // Facebook Post Resolvers
  facebookPosts: async () => {
    try {
      const posts = await facebookPostsCollection.find({}).toArray();
      if (!posts) {
        // console.log("No Facebook posts found");
        throw createError(404, "No Facebook posts found");
      }
      return posts;
    } catch (error) {
      console.log("Error getting Facebook posts", error);
      throw error;
    }
  },

  facebookPost: async ({ id }) => {
    try {
      const post = await facebookPostsCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!post) {
        // console.log("Facebook post not found");
        throw createError(404, "Facebook post not found");
      }
      return post;
    } catch (error) {
      console.log("Error getting Facebook post", error);
      throw error;
    }
  },

  createFacebookPost: async ({ content, authorId }) => {
    try {
      const value = validate(createPostSchema, { content, authorId });
      const authorObjectId = new ObjectId(value?.authorId);
      const user = await usersCollection.findOne({
        _id: authorObjectId as any,
      });

      if (!user) {
        // console.log("Author not found");
        throw createError(404, "Author not found");
      }

      const newPost: FacebookPost = {
        authorId,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await facebookPostsCollection.insertOne(newPost);
      if (!result.insertedId) {
        // console.log("Failed to insert Facebook post");
        throw createError(404, "Failed to insert Facebook post");
      }

      return await facebookPostsCollection.findOne({
        _id: result.insertedId,
      });
    } catch (error) {
      console.log("Error creating Facebook post", error);
      throw error;
    }
  },

  updateFacebookPost: async ({ id, input }) => {
    try {
      console.log("Received update request for Facebook Post");
      console.log("ID:", id);
      console.log("Input data:", input);
  
      const updateData = { ...input, updatedAt: new Date() };
      console.log("Prepared update data:", updateData);
  
      const objectId = new ObjectId(id);
      console.log("Converted ObjectId:", objectId);
  
      const updatedPost = await facebookPostsCollection.findOneAndUpdate(
        { _id: objectId as any },
        { $set: updateData },
        { returnDocument: 'after' }
      );
  
      console.log("findOneAndUpdate result:", updatedPost);
  
      // Directly check if the updatedPost exists
      if (!updatedPost) {
        console.error("Facebook post not found or update failed");
        throw createError(404, "Facebook post not found or update failed");
      }
  
      console.log("Updated document:", updatedPost);
      return updatedPost;
    } catch (error) {
      console.error("Error updating Facebook post", error);
      throw error;
    }
  },
  
  
  
  
  deleteFacebookPost: async ({ id }) => {
    try {
      console.log("Received delete request for Facebook Post");
      console.log("ID:", id);
  
      const deletedPost = await facebookPostsCollection.findOneAndDelete({
        _id: new ObjectId(id) as any
      });
  
      console.log("findOneAndDelete result:", deletedPost);
  
      // Directly check if the deletedPost exists
      if (!deletedPost) {
        console.error("Facebook post not found or delete failed");
        throw createError(404, "Facebook post not found or delete failed");
      }
  
      console.log("Deleted document:", deletedPost);
      return deletedPost;
    } catch (error) {
      console.error("Error deleting Facebook post", error);
      throw error;
    }
  },
  

  // Instagram Post Resolvers
  instagramPosts: async () => {
    try {
      const posts = await instagramPostsCollection.find({}).toArray();
      if (!posts) {
        // console.log("No Instagram posts found");
        throw createError("No Instagram posts found");
      }
      return posts;
    } catch (error) {
      console.log("Error getting Instagram posts", error);
      throw error;
    }
  },

  instagramPost: async ({ id }) => {
    try {
      const post = await instagramPostsCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!post) {
        // console.log("Instagram post not found");
        throw createError(404, "Instagram post not found");
      }
      return post;
    } catch (error) {
      console.log("Error getting Instagram post", error);
      throw error;
    }
  },

  createInstagramPost: async ({ imageUrl, caption, authorId }) => {
    try {
      const value = validate(createInstagramPostSchema, {
        imageUrl,
        caption,
        authorId,
      });
      const authorObjectId = new ObjectId(value?.authorId);
      const user = await usersCollection.findOne({
        _id: authorObjectId as any,
      });

      if (!user) {
        // console.log("Author not found");
        throw createError(404, "Author not found");
      }

      const newPost: InstagramPost = {
        authorId,
        imageUrl,
        caption,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await instagramPostsCollection.insertOne(newPost);
      if (!result.insertedId) {
        // console.log("Failed to insert Instagram post");
        throw createError(400, "Failed to insert Instagram post");
      }

      return await instagramPostsCollection.findOne({
        _id: result.insertedId,
      });
    } catch (error) {
      console.log("Error creating Instagram post", error);
      throw error;
    }
  },

  // Tweet Resolvers
  tweets: async () => {
    try {
      const tweets = await tweetsCollection.find({}).toArray();
      if (!tweets) {
        // console.log("No tweets found");
        throw createError(404, "No tweets found");
      }
      return tweets;
    } catch (error) {
      console.log("Error getting tweets", error);
      throw error;
    }
  },

  tweet: async ({ id }) => {
    try {
      const tweet = await tweetsCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!tweet) {
        // console.log("Tweet not found");
        throw createError(404, "Tweet not found");
      }
      return tweet;
    } catch (error) {
      console.log("Error getting tweet", error);
      throw error;
    }
  },

  createTweet: async ({ content, authorId }) => {
    try {
      const value = validate(createPostSchema, { content, authorId });
      const authorObjectId = new ObjectId(value.authorId);
      const user = await usersCollection.findOne({
        _id: authorObjectId as any,
      });

      if (!user) {
        // console.log("Author not found");
        throw createError(404, "Author not found");
      }

      const newTweet: Tweet = {
        authorId,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await tweetsCollection.insertOne(newTweet);
      if (!result.insertedId) {
        // console.log("Failed to insert tweet");
        throw createError(400, "Failed to insert tweet");
      }

      return await tweetsCollection.findOne({
        _id: result.insertedId,
      });
    } catch (error) {
      console.log("Error creating tweet", error);
      throw error;
    }
  },

  // ... other mutation resolvers ...
};

export default resolvers;
