# Break Timings

- Tea Break - 12:30PM (15 minutes)
- Lunch Break - 2:00PM (45 minutes)
- Tea Break - 4:15PM (15 minutes)

# JavaScript

- Scripting Language
- Single Threaded
- Loosely typed
- Dynamic behaviour
- Rich set of libraries
- Client-side (Browser) as well as Server-side (Node Runtime)
- DOM Model
- Cross Platform
- Asynchronous / Non-blocking
- Event Driven
- I/O is Async
- Light-weighted

JavaSript

MEAN- Mongo Express Angular Node
MERN- Mongo Express React Node

# NodeJS Installer

- Node Runtime Environment (REPL)
- Node Package Manager (NPM)
- Node Native Module ( eg. http, fs, os, util, events, path etc)

# Synchronous Code -> executed by Single thread

# Asynchronous Code -> executed by different thread environment

- Callbacks
- Timers
- Promises
- XHR Calls
- Sockets
- Reading / Writing

# REST API

- /books : id, isbn, title, author, numOfPages ...
- /authors : id, name, age, address ...

- bookId, title, name, age

- Over-fetching: fetching more data then needed
- under-fetching: fetching less data then needed
- Server-centric approach
- Multiple REST Endpoints

# GraphQL API

query {
books {id title author}
}

query {

    users(name : "john doe") {
        name
        age
        posts {
            title
            body
            comments {
                text
            }
        }
    }

}

# Steps for creating GraphQL Server

- Create NodeJS Project
  > npm init (creates package.json file)
- Install graphql dependencies
  > npm install graphql-yoga graphql
  > npm install nodemon -D
- Adjust some config in package.json file
  : type : "module"
  : scripts
- Create GraphQL Server on top of Node HTTP Server

> npm run devStart

---

query FetchUsers{
users{
id
name
age
comments
{
id
text
}
}
}

query FetchPosts{
posts{
id
title
creator{
id
name
}
comments{
id
text
}
}
}

query FetchComments{
comments{
id
text
author{
id
name
age
}
}
}

---

# Day 02

- Scalar Types : holds single value
- Non-scalar Types : holds more than one value
- Schema : Specifies Server capabilities
- Type Definition : Defines the Type of Entities / Fields
- Resolver : functions; implementation of abstract structure
- Query: Generic Term
  > Query - fetch the data
  > Mutation - Create, update and delete
  > Subscription - real-time updates

# To install UUID Package

> npm install uuid

## Mongo with Prisma

- npm init -y
- npm install prisma
- npx prisma init
- Install Prisma and Prettier Plugin from market place
- npx prisma db push / pull
- npm install @prisma/client
- npx prisma generate
- npm install graphql-yoga graphql

# to create frontend Vanilla JavaScript

> npm create vite
> npm install @apollo/client graphql react

---

- Test : Jest
- React App
