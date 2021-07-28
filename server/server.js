const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;


async function startApolloServer(typeDefs, resolvers, PORT, routes, db) {

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    // context: authMiddleware, 
  });

  await server.start();

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  server.applyMiddleware({ app });

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);  

  // await new Promise(resolve => app.listen({ port: PORT }, resolve));
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`)
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });
  });
  return { server, app };
}

startApolloServer(typeDefs, resolvers, PORT, routes, db);

