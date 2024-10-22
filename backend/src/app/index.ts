import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';


export async function initServer() {
    const app = express();
    const typeDefs = `#graphql
        type Query {
            hello: String
        }
    `
    const resolvers = {
        Query: {
            hello: () => `Hello my boi`
        }
    }
    const server = new ApolloServer({
        typeDefs,
        resolvers,
      });

    await server.start();
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server),
      );
      return app
}
