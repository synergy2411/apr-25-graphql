import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { PrismaClient } from "../prisma/app/generated/prisma/client/index.js";
import { GraphQLError } from "graphql";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { hashSync, compareSync } = bcrypt;
const { sign } = jwt;
const SECRET_KET = "MY_SUPER_SECRET_KEY";

const prisma = new PrismaClient();

const typeDefs = /* GraphQL */ `
  type Mutation {
    signUp(data: SignUpInput!): SignUpPayload!
    signIn(data: SignInInput!): SignInPayload!
  }
  type Query {
    hello: String!
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
          SECRET_KET
        );

        return { token };
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err);
      }
    },
  },
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
