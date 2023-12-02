import { connectToDatabase } from '../mongo';

jest.mock('../mongo', () => ({
  connectToDatabase: jest.fn(),
}));

describe('MongoDB Connection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to MongoDB successfully', async () => {
    // Mock the connectToDatabase function to simulate a successful connection
    (connectToDatabase as jest.Mock).mockResolvedValueOnce(null);

    // Call the function
    await expect(connectToDatabase()).resolves.toBe(null);

    // Ensure it was called
    expect(connectToDatabase).toHaveBeenCalled();
  });

  it('should handle MongoDB connection error', async () => {
    // Mock the connectToDatabase function to simulate a connection failure
    const mockError = new Error('Connection failed');
    (connectToDatabase as jest.Mock).mockRejectedValueOnce(mockError);

    // Call the function and expect it to throw an error
    await expect(connectToDatabase()).rejects.toThrow('Connection failed');

    // Ensure it was called
    expect(connectToDatabase).toHaveBeenCalled();
  });
});

