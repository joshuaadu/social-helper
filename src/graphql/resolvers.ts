import { ObjectId } from "mongodb";
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
        throw createError(404, "No users found");
      }
      return users;
    } catch (error) {
      throw error;
    }
  },

  user: async ({ id }) => {
    try {
      const user = await usersCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!user) {
        throw createError(404, "User not found");
      }
      return user;
    } catch (error) {
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
        throw createError(400, "Failed to insert user");
      }

      const createdUser = await usersCollection.findOne({
        _id: result.insertedId,
      });
      if (!createdUser) {
        throw createError(404, "Inserted user not found");
      }
      return createdUser;
    } catch (error) {
      throw error;
    }
  },

  // Facebook Post Resolvers
  facebookPosts: async () => {
    try {
      const posts = await facebookPostsCollection.find({}).toArray();
      if (!posts) {
        throw createError(404, "No Facebook posts found");
      }
      return posts;
    } catch (error) {
      throw error;
    }
  },

  facebookPost: async ({ id }) => {
    try {
      const post = await facebookPostsCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!post) {
        throw createError(404, "Facebook post not found");
      }
      return post;
    } catch (error) {
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
        throw createError(404, "Failed to insert Facebook post");
      }

      return await facebookPostsCollection.findOne({
        _id: result.insertedId,
      });
    } catch (error) {
      throw error;
    }
  },

  // Instagram Post Resolvers
  instagramPosts: async () => {
    try {
      const posts = await instagramPostsCollection.find({}).toArray();
      if (!posts) {
        throw createError("No Instagram posts found");
      }
      return posts;
    } catch (error) {
      throw error;
    }
  },

  instagramPost: async ({ id }) => {
    try {
      const post = await instagramPostsCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!post) {
        throw createError(404, "Instagram post not found");
      }
      return post;
    } catch (error) {
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
        throw createError(400, "Failed to insert Instagram post");
      }

      return await instagramPostsCollection.findOne({
        _id: result.insertedId,
      });
    } catch (error) {
      throw error;
    }
  },

  // Tweet Resolvers
  tweets: async () => {
    try {
      const tweets = await tweetsCollection.find({}).toArray();
      if (!tweets) {
        throw createError(404, "No tweets found");
      }
      return tweets;
    } catch (error) {
      throw error;
    }
  },

  tweet: async ({ id }) => {
    try {
      const tweet = await tweetsCollection.findOne({
        _id: new ObjectId(id) as any,
      });
      if (!tweet) {
        throw createError(404, "Tweet not found");
      }
      return tweet;
    } catch (error) {
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
        throw createError(400, "Failed to insert tweet");
      }

      return await tweetsCollection.findOne({
        _id: result.insertedId,
      });
    } catch (error) {
      throw error;
    }
  },

  // ... other mutation resolvers ...
};

export default resolvers;
