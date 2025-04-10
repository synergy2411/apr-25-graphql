import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World",
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(4000, () => console.log("Yoga 🚀 started on PORT : 4000"));
