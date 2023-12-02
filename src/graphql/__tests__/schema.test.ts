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

    // Add more tests for other queries...
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

    // Add more tests for other mutations...
  });

  // Add more tests for specific types, fields, etc.
});

