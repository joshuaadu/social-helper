import { ObjectId } from "mongodb";
import { usersCollection } from '../../database/user';
import { tweetsCollection } from '../../database/tweet';
import { facebookPostsCollection } from '../../database/facebookPost';
import { instagramPostsCollection } from '../../database/instagramPost';
import resolvers from '../../graphql/resolvers';

jest.mock('../../database/user');
jest.mock('../../database/tweet');
jest.mock('../../database/facebookPost');
jest.mock('../../database/instagramPost');

describe('GraphQL Resolvers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    afterEach(() => {
    });
    afterAll(() => {
    });

    // test for facebookPosts resolver
    describe('facebookPosts resolver', () => {
        it('should fetch and return facebook posts', async () => {
            const mockPosts = [{ _id: new ObjectId(), content: 'Hello world', authorId: new ObjectId() }];
            const toArrayMock = jest.fn().mockResolvedValue(mockPosts);

            // Casting to Jest Mock type
            (facebookPostsCollection.find as jest.Mock).mockReturnValue({ toArray: toArrayMock });

            const result = await resolvers.facebookPosts();
            expect(result).toEqual(mockPosts);
            expect(toArrayMock).toHaveBeenCalled();
        });
    });

    //test for instagramPosts resolver
    describe('instagramPosts resolver', () => {
        it('should fetch and return instagram posts', async () => {
            const mockPosts = [
                { _id: new ObjectId(), imageUrl: 'http://example.com/image1.jpg', caption: 'Post 1', authorId: new ObjectId() },
                { _id: new ObjectId(), imageUrl: 'http://example.com/image2.jpg', caption: 'Post 2', authorId: new ObjectId() }
            ];
            const toArrayMock = jest.fn().mockResolvedValue(mockPosts);

            (instagramPostsCollection.find as jest.Mock).mockReturnValue({ toArray: toArrayMock });

            const result = await resolvers.instagramPosts();
            expect(result).toEqual(mockPosts);
            expect(toArrayMock).toHaveBeenCalled();
        });
    });

    // Test for tweets resolver
    describe('tweets resolver', () => {
        it('should fetch and return tweets', async () => {
            const mockTweets = [
                { _id: new ObjectId(), content: 'Tweet 1', authorId: new ObjectId() },
                { _id: new ObjectId(), content: 'Tweet 2', authorId: new ObjectId() }
            ];
            const toArrayMock = jest.fn().mockResolvedValue(mockTweets);

            (tweetsCollection.find as jest.Mock).mockReturnValue({ toArray: toArrayMock });

            const result = await resolvers.tweets();
            expect(result).toEqual(mockTweets);
            expect(toArrayMock).toHaveBeenCalled();
        });
    });

    // Test for users resolver
    describe('users resolver', () => {
        it('should fetch and return users', async () => {
            const mockUsers = [
                { _id: new ObjectId(), username: 'user1', email: 'user1@example.com' },
                { _id: new ObjectId(), username: 'user2', email: 'user2@example.com' }
            ];
            const toArrayMock = jest.fn().mockResolvedValue(mockUsers);

            (usersCollection.find as jest.Mock).mockReturnValue({ toArray: toArrayMock });

            const result = await resolvers.users();
            expect(result).toEqual(mockUsers);
            expect(toArrayMock).toHaveBeenCalled();
        });
    });
});




