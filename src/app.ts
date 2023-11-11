import express from "express";
import { graphqlHTTP } from "express-graphql";
import { root, schema } from "./graphql";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

export default app;
