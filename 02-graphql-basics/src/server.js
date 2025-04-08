import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";

// Scalar Types - ID, String, Boolean, Int, Float
// Non-scalar field - Product - title, price, qty, desc, isAvailable

let allUsers = [
  { id: "u001", name: "monica", age: 23 },
  { id: "u002", name: "ross", age: 24 },
  { id: "u003", name: "rachel", age: 22 },
];

let allPosts = [
  {
    id: "p001",
    title: "GraphQL 101",
    body: "Awesome content",
    published: true,
  },
  {
    id: "p002",
    title: "Refresh React",
    body: "React bootcamp",
    published: false,
  },
  {
    id: "p003",
    title: "NodeJS for Naive",
    body: "For beginners",
    published: true,
  },
  {
    id: "p004",
    title: "Spring in Java",
    body: "Framework of Frameworks",
    published: false,
  },
];

const typeDefs = /* GraphQL */ `
  type Query {
    users(name: String): [User!]!
    posts(search: String): [Post!]!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      if (args.name) {
        return allUsers.filter((user) => user.name.includes(args.name));
      }
      return allUsers;
    },
    posts: (parent, args, context, info) => {
      if (args.search) {
        return allPosts.filter((post) => {
          return (
            post.title.toLowerCase().includes(args.search.toLowerCase()) ||
            post.body.toLowerCase().includes(args.search.toLowerCase())
          );
        });
      }
      return allPosts;
    },
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
