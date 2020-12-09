import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
const main = async () => {
  const app = express();

  app.get("/", (_, res) => {
    res.send("hello");
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + "/resolvers/*.ts"],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  apolloServer.applyMiddleware({ app });
  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log("server started at http://localhost:4000/graphql");
  });
};
main().catch((err) => {
  console.error(err);
});
