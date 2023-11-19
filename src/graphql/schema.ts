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
    id: ID!
    content: String!
    authorId: ID!
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
  }

  type Mutation {
    createUser(input: UserInput): DatabaseUser
    updateUser(id: ID!, input: UserInput): DatabaseUser
    createTweet(content: String!, authorId: ID!): Tweet
    updateTweet(id: ID!, content: String): Tweet
  }
`);

export default schema;
