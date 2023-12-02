import * as express from "express";
import { graphqlHTTP } from "express-graphql";
import * as passport from "passport";
import * as session from "express-session";

import router from "./routes";
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const app = express();

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

export default app;
