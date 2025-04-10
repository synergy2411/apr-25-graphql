import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { PrismaClient } from "../prisma/app/generated/prisma/client/index.js";
import { GraphQLError } from "graphql";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { hashSync, compareSync } = bcrypt;
const { sign, verify } = jwt;

const SECRET_KEY = "MY_SUPER_SECRET_KEY";

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Mutation {
    signUp(data: SignUpInput!): SignUpPayload!
    signIn(data: SignInInput!): SignInPayload!
    createPost(data: CreatePostInput!): Post!
  }
  type Query {
    hello: String!
    posts: [Post!]!
  }
  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type User {
    name: String!
    age: Int!
    email: String!
    role: Role!
  }

  type SignUpPayload {
    message: String!
  }

  type SignInPayload {
    token: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
  input SignUpInput {
    name: String!
    age: Int!
    email: String!
    password: String!
    role: Role!
  }

  input CreatePostInput {
    title: String!
    body: String!
  }
  enum Role {
    DEVELOPER
    MANAGER
    ADMIN
  }
`;

const resolvers = {
  Mutation: {
    signUp: async (parent, args, context, info) => {
      try {
        const { name, age, email, password, role } = args.data;
        const hashedPassword = hashSync(password, 12);
        const createdUser = await prisma.user.create({
          data: {
            name,
            age,
            email,
            password: hashedPassword,
            role,
          },
        });
        console.log(createdUser);
        return { message: "User created with Id - " + createdUser.id };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
    signIn: async (parent, args, context, info) => {
      try {
        const { email, password } = args.data;

        const foundUser = await prisma.user.findUnique({ where: { email } });

        if (!foundUser) {
          throw new GraphQLError("Unable to find user for email - " + email);
        }

        const isMatched = compareSync(password, foundUser.password);

        if (!isMatched) {
          throw new GraphQLError("Password does not match! Try again.");
        }

        const token = sign(
          {
            id: foundUser.id,
            name: foundUser.name,
            role: foundUser.role,
            email: foundUser.email,
          },
          SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        return { token };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
    createPost: async (parent, args, { token }, info) => {
      try {
        const { title, body } = args.data;

        if (!token) {
          throw new GraphQLError("Authentication required.");
        }

        const { id, name, age, email, role } = verify(token, SECRET_KEY);

        // const foundUser = await prisma.user.findUnique({
        //   where: { id: authorId },
        // });
        // if (!foundUser) {
        //   throw new GraphQLError("Author not found for given Id - " + authorId);
        // }
        const createdPost = await prisma.post.create({
          data: {
            title,
            body,
            published: false,
            authorId: id,
          },
        });
        return createdPost;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  },
  Query: {
    hello: () => "Hello World",
    posts: async (parent, args, context, info) => {
      try {
        const allPosts = await prisma.post.findMany({
          include: {
            author: true,
          },
          orderBy: {
            title: "desc",
          },
          //   distinct: "authorId",
          take: 3,
          skip: 1,
          //   select: {
          //     body: true,
          //   },
        });
        return allPosts;
      } catch (err) {
        throw new GraphQLError(err);
      }
    },
  },
};

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  context: ({ request }) => {
    let token = null;
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      token = authHeader.split(" ")[1]; // "Bearer Token"  => ["Bearer", "token"]
    }
    return { token };
  },
});

const server = createServer(yoga);

server.listen(4000, () => console.log("Yoga 🚀 started on PORT : 4000"));
