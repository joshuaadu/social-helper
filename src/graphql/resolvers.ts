import { ObjectId } from 'mongodb';
import { usersCollection, User } from '../database/user';
import { tweetsCollection, Tweet } from '../database/tweet';

function transformId(doc: any) {
  const transformedDoc = { ...doc, id: doc._id.toString() };
  delete transformedDoc._id;
  return transformedDoc;
}

const resolvers = {
//  Query: {
    hello: () => "Hello world!",

    rollDice: ({ numDice, numSides }) => {
      var output = []
      for (var i = 0; i < numDice; i++) {
        output.push(1 + Math.floor(Math.random() * (numSides || 6)))
      }
      return output
    },


    
    users: async () => {
        try {
            const users = await usersCollection.find({}).toArray();
            if (!users) {
                console.error('No users found');
                throw new Error('No users found');
            }
            console.log("Fetched users:", users);
            return users;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    },

    getUsers: async () => {
      try {
          const users = await usersCollection.find({}).toArray();
          if (!users) {
              console.error('No users found');
              throw new Error('No users found');
          }
          console.log("Fetched users:", users);
          return users;
      } catch (error) {
          console.error("Error fetching users:", error);
          throw error;
      }
  },

    user: async (_, { id }) => {
        try {
            const user = await usersCollection.findOne({ _id: new ObjectId(id) as any });
            if (!user) {
                console.error('User not found');
                throw new Error('User not found');
            }
            console.log("Fetched user:", user);
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    },

//     // ... other query resolvers ...
//   },
//   Mutation: {
//     createUser: async (_, { username, email, provider, providerId }) => {
//         const newUser: User = {
//             username, email, provider, providerId, createdAt: new Date(), updatedAt: new Date()
//         };

//         console.log("Attempting to create user:", newUser);

//         try {
//             const result = await usersCollection.insertOne(newUser);
//             if (!result.insertedId) {
//                 console.error('Insertion failed: No ID returned');
//                 throw new Error('Failed to insert user');
//             }

//             const createdUser = await usersCollection.findOne({ _id: result.insertedId });
//             if (!createdUser) {
//                 console.error('Inserted user not found');
//                 throw new Error('Inserted user not found');
//             }
//             console.log("Created user:", createdUser);
//             return createdUser;
//         } catch (error) {
//             console.error("Error creating user:", error);
//             throw error;
//         }
//     },

//     // ... other mutation resolvers ...
//   },
};

export default resolvers;
