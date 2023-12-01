import { config } from "dotenv";
config(); // This should be the first thing to run

import * as express from "express";
import * as http from "http";
import { graphqlHTTP } from "express-graphql";
import * as passport from "passport";

import router from "./routes";

import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import { connectToDatabase } from "./database/mongo"; // Adjust path if needed
import * as session from "express-session";

const app = express();

const startServer = async () => {
  try {
    await connectToDatabase();
    const server = http.createServer(app);

    app.use(
      session({
        secret: process.env.SESSION_SECRET, // replace with your own secret key
        resave: false,
        saveUninitialized: false,
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(router);

    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: resolvers,
        graphiql: true,
      })
    );

    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    server.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  } catch (error) {
    console.error("Failed to start the server", error);
  }
};

startServer();
