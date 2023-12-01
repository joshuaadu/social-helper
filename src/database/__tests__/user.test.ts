import { db } from '../mongo';
import { usersCollection } from '../user';

jest.mock('../mongo', () => {
  const mockCollection = {
    find: jest.fn(),
    insertOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  };

  return {
    db: {
      collection: jest.fn().mockReturnValue(mockCollection),
    },
  };
});

describe('User Collection', () => {
  it('should initialize the users collection correctly', () => {
    expect(db.collection).toHaveBeenCalledWith('users');
  });

  it('should have the necessary collection methods', () => {
    expect(usersCollection).toHaveProperty('find');
    expect(usersCollection).toHaveProperty('insertOne');
    expect(usersCollection).toHaveProperty('updateOne');
    expect(usersCollection).toHaveProperty('deleteOne');
  });

  // Additional tests for specific methods can be added here
});
