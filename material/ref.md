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
  : type
  : scripts
- Create GraphQL Server on top of Node HTTP Server
