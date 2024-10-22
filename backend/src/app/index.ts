import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { User } from './user';
import cors from 'cors';
import express from 'express';


export async function initServer() {
    const app = express();

    const typeDefs = `#graphql
        ${User.types}

        type Query {
            ${User.queries}
        }

        type Mutation {
            ${User.mutations}
        }
    `
    const resolvers = {
        Query: {
            ...User.resolvers.queries
        },
        Mutation: {
            ...User.resolvers.mutations
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
