import { graphql } from 'graphql';
import schema from '../schema';

describe('GraphQL Schema', () => {
  it('should have a valid schema', () => {
    expect(schema).toBeDefined();
  });

  // Test specific queries
  describe('Query', () => {
    it('should have a `users` query', async () => {
      const query = `{ users { username email } }`;
      const result = await graphql({ schema, source: query });
      expect(result).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    // Tests for other queries
    it('should have a `tweets` query', async () => {
      const query = `{ tweets { _id content authorId } }`;
      const result = await graphql({ schema, source: query });
      expect(result).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    it('should have a `facebookPosts` query', async () => {
      const query = `{ facebookPosts { _id content authorId } }`;
      const result = await graphql({ schema, source: query });
      expect(result).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    it('should have a `instagramPosts` query', async () => {
      const query = `{ instagramPosts { _id imageUrl caption authorId } }`;
      const result = await graphql({ schema, source: query });
      expect(result).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    // Add more tests for other queries like `user`, `tweet`, `facebookPost`, `instagramPost`...
  });

  // Test specific mutations
  describe('Mutation', () => {
    it('should have a `createUser` mutation', async () => {
      const mutation = `
        mutation {
          createUser(input: { username: "test", email: "test@example.com", password: "1234", provider: "local", providerId: "123" }) {
            username
            email
          }
        }
      `;
      const result = await graphql({ schema, source: mutation });
      expect(result).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    // Tests for other mutations
    it('should have a `createTweet` mutation', async () => {
      const mutation = `
        mutation {
          createTweet(content: "Hello World", authorId: "12345") {
            _id
            content
            authorId
          }
        }
      `;
      const result = await graphql({ schema, source: mutation });
      expect(result).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    it('should have a `createFacebookPost` mutation', async () => {
      const mutation = `
        mutation {
          createFacebookPost(content: "Hello Facebook", authorId: "12345") {
            _id
            content
            authorId
          }
        }
      `;
      const result = await graphql({ schema, source: mutation });
      expect(result).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    it('should have a `createInstagramPost` mutation', async () => {
      const mutation = `
        mutation {
          createInstagramPost(imageUrl: "http://example.com/image.jpg", caption: "Nice view", authorId: "12345") {
            _id
            imageUrl
            caption
            authorId
          }
        }
      `;
      const result = await graphql({ schema, source: mutation });
      expect(result).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    // Add more tests for other mutations like `updateUser`...
  });

  // Add more tests for specific types, fields, etc.
});
