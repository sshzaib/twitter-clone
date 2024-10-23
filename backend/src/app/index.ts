import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { User } from './user';
import { JWT } from '../services/jwt'
import cors from 'cors';
import express from 'express';
import { GraphqlContext } from '../types';


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
    const server = new ApolloServer<GraphqlContext>({
        typeDefs,
        resolvers,
      });

    await server.start();
    app.use(
        '/graphql',
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                return req.headers.authorization ? { user: JWT.decodeJwtToken(req.headers.authorization.split(" ")[1])} : null
            }
        }),
      );
      return app
}
