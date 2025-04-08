import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

const typeDefs = `
    type Query {
        hello: String
    }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

// Create Schema
const schema = createSchema({
  typeDefs, // Structure
  resolvers, // Behaviour
});

// Create Yoga Server
const yoga = createYoga({ schema });

// Create HTTP Server
const server = createServer(yoga);

server.listen(4040, () =>
  console.log("GraphQL Server started 🚀 at PORT : 4040")
);
