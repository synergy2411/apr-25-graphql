import { createSchema, createYoga } from "graphql-yoga";
import { GraphQLError } from "graphql";
import { createServer } from "node:http";
import { v4 } from "uuid";

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
    creator: "u003",
  },
  {
    id: "p002",
    title: "Refresh React",
    body: "React bootcamp",
    published: false,
    creator: "u003",
  },
  {
    id: "p003",
    title: "NodeJS for Naive",
    body: "For beginners",
    published: true,
    creator: "u001",
  },
  {
    id: "p004",
    title: "Spring in Java",
    body: "Framework of Frameworks",
    published: false,
    creator: "u002",
  },
];

let allComments = [
  { id: "c001", text: "I like it", postId: "p003", author: "u002" },
  { id: "c002", text: "Luv it", postId: "p001", author: "u001" },
  { id: "c003", text: "Not bad", postId: "p001", author: "u002" },
  { id: "c004", text: "just like that", postId: "p002", author: "u001" },
];

const typeDefs = /* GraphQL */ `
  type Query {
    users(name: String): [User!]!
    posts(search: String): [Post!]!
    comments: [Comment!]!
  }
  type Mutation {
    createUser(name: String!, age: Int!): User!
    createPost(data: CreatePostInput!): Post!
    createComment(data: CreateCommentInput!): Comment!
    deleteComment(commentId: ID!): Comment!
  }
  type User {
    id: ID!
    name: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    creator: User!
    comments: [Comment!]!
  }
  type Comment {
    id: ID!
    text: String!
    post: Post!
    author: User!
  }

  input CreatePostInput {
    title: String!
    body: String!
    creatorId: ID!
  }

  input CreateCommentInput {
    text: String!
    postId: ID!
    authorId: ID!
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
    comments: (parent, args, context, info) => allComments,
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      const { name, age } = args;
      let newUser = { name, age, id: v4() };
      allUsers.push(newUser);
      return newUser;
    },
    createPost: (parent, args, context, info) => {
      const { title, body, creatorId } = args.data;
      const position = allUsers.findIndex((user) => user.id === creatorId);
      if (position === -1) {
        throw new GraphQLError("Unable to find creator for id - " + creatorId);
      }
      let newPost = {
        id: v4(),
        title,
        body,
        published: false,
        creator: creatorId,
      };
      allPosts.push(newPost);
      return newPost;
    },
    createComment: (parent, args, context, info) => {
      const { text, postId, authorId } = args.data;
      const postPosition = allPosts.findIndex((post) => post.id === postId);
      if (postPosition === -1) {
        throw new GraphQLError("Unable to find post for id - " + postId);
      }

      const userPosition = allUsers.findIndex((user) => user.id === authorId);
      if (userPosition === -1) {
        throw new GraphQLError("Unable to find author for ID - " + authorId);
      }

      let newComment = {
        id: v4(),
        text,
        postId,
        author: authorId,
      };
      allComments.push(newComment);
      return newComment;
    },
    deleteComment: (parent, args, context, info) => {
      const position = allComments.findIndex(
        (comment) => comment.id === args.commentId
      );
      if (position === -1) {
        throw new GraphQLError(
          "Unable to delete comment for Id -- " + args.commentId
        );
      }
      const [deletedComment] = allComments.splice(position, 1);

      return deletedComment;
    },
  },
  Post: {
    creator: (parent, args, context, info) => {
      return allUsers.find((user) => user.id === parent.creator);
    },
    comments: (parent, args, context, info) => {
      return allComments.filter((comment) => comment.postId === parent.id);
    },
  },
  User: {
    posts: (parent, args, context, info) => {
      return allPosts.filter((post) => post.creator === parent.id);
    },
    comments: (parent, args, context, info) => {
      return allComments.filter((comment) => comment.author === parent.id);
    },
  },
  Comment: {
    post: (parent, args, context, info) => {
      return allPosts.find((post) => post.id === parent.postId);
    },
    author: (parent, args, context, info) => {
      return allUsers.find((user) => user.id === parent.author);
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
