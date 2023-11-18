// schema.ts
import { buildSchema } from 'graphql';

const schema = buildSchema(`
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

export default schema;
