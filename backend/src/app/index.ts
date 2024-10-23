import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { User } from './user';
import { JWT } from '../services/jwt'
import cors from 'cors';
import express from 'express';
import { GraphqlContext } from '../types';
import { Tweet } from './tweet';


export async function initServer() {
    const app = express();

    const typeDefs = `#graphql
        ${User.types}
        ${Tweet.types}

        type Query {
            ${User.queries}
            ${Tweet.queries}
        }

        type Mutation {
            ${User.mutations}
            ${Tweet.mutations}
        }
    `
    const resolvers = {
        Query: {
            ...User.resolvers.queries,
            ...Tweet.resolvers.queries
        },
        Mutation: {
            ...User.resolvers.mutations,
            ...Tweet.resolvers.mutations
        },
        ...Tweet.resolvers.extraResolvers,
        ...User.resolvers.extraResolvers
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
                return req.headers.authorization ? { user: await JWT.decodeJwtToken(req.headers.authorization.split(" ")[1])} : null
            }
        }),
      );
      return app
}
