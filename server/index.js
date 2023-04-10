// server.js
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type GreetingCacheById {
    id: Int
    value: String
  }
  type Query {
    greeting: String
    greetingCacheById: GreetingCacheById
  }
`;

const getRand100 = () => parseInt(Math.random() * 100 + 1);

const resolvers = {
  Query: {
    greetingCacheById: () => {
      return {
        id: 1,
        value: `Hello from GraphQL Server!, User ${getRand100()}`,
      };
    },
    greeting: () => `Hello from GraphQL Server!, User ${ getRand100() }`,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

const startServer = async () => {
  await server.start()
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer()