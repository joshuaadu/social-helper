import { usersCollection } from '../../database/user';
import resolvers from '../../graphql/resolvers';

// Mock the entire usersCollection
jest.mock('../../database/user', () => ({
    usersCollection: {
        find: jest.fn(),
        findOne: jest.fn(),
        insertOne: jest.fn(),
    },
}));

describe('GraphQL Resolvers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('users resolver', () => {
        it('should fetch and return users', async () => {
            const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
            const mockToArray = jest.fn().mockResolvedValue(mockUsers);
            (usersCollection.find as jest.Mock).mockReturnValue({ toArray: mockToArray });

            const result = await resolvers.users();
            expect(result).toEqual(mockUsers);
            expect(usersCollection.find).toHaveBeenCalled();
            expect(mockToArray).toHaveBeenCalled();// Add your test code here
        });

        // ... other tests ...
    });

    // ... Additional tests for other resolvers...
});


