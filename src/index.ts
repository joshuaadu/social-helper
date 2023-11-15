import http from "http";
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
const server = http.createServer(app);

server.listen(3000, () => {
  console.log("Listening on port 3000");
});
