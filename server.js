import {ApolloServer} from 'apollo-server'
import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core'
import typeDefs from './gqlSchema.js'
import connectToMongoDB from './config/db.js'
import {context} from './middleware/AuthMiddleware.js'

// connect To DB
connectToMongoDB()


import resolvers from './resolvers.js'

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});