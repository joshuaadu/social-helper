// schema.ts
import { buildSchema } from "graphql";

const schema = buildSchema(`
interface User {
  username: String!
  email: String!
}

type DatabaseUser implements User {
    _id: String!
    username: String!
    email: String!
    password: String!
    provider: String!
    providerId: String!
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    provider: String!
    providerId: String!
  }

  type Tweet {
    _id: ID!
    authorId: ID!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type FacebookPost {
    _id: ID!
    authorId: String!
    content: String!
    createdAt: String!
    updatedAt: String!
  }

  type InstagramPost {
    _id: ID!
    authorId: String!
    imageUrl: String!
    caption: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    hello: String
    rollDice(numDice: Int!, numSides: Int): [Int]
    users: [DatabaseUser]
    user(id: ID!): DatabaseUser
    tweets: [Tweet]
    tweet(id: ID!): Tweet
    facebookPosts: [FacebookPost]
    facebookPost(id: ID!): FacebookPost
    instagramPosts: [InstagramPost]
    instagramPost(id: ID!): InstagramPost
  }

  type Mutation {
    createUser(input: UserInput): DatabaseUser
    updateUser(id: ID!, input: UserInput): DatabaseUser
    createTweet(content: String!, authorId: ID!): Tweet
    createFacebookPost(content: String!, authorId: ID!): FacebookPost
    updateFacebookPost(id: ID!, input: UpdateFacebookPostInput): FacebookPost
    deleteFacebookPost(id: ID!): FacebookPost
    createInstagramPost(imageUrl: String!, caption: String, authorId: ID!): InstagramPost
  }

  input UpdateFacebookPostInput {
    content: String
  }
`);

export default schema;
