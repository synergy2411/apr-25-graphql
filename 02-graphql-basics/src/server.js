import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

// Scalar Types - ID, String, Boolean, Int, Float
// Non-scalar field - Product - title, price, qty, desc, isAvailable

let allUsers = [
  { id: "u001", name: "monica", age: 23 },
  { id: "u002", name: "ross", age: 24 },
  { id: "u003", name: "rachel", age: 22 },
];

const typeDefs = /* GraphQL */ `
  type Query {
    users: [User!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
  }
`;

const resolvers = {
  Query: {
    users: () => allUsers,
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
