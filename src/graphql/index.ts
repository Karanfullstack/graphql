import {ApolloServer} from "@apollo/server";
import {User} from "./user";

async function createApolloGraphqlServer() {
	
	const server = new ApolloServer({
		// @@--Type definitions define the "shape" of your data and specify
		typeDefs: ` 
     type Query {
			 hello: String
		 }
		 type Mutation {
			${User.mutations}
		 }
    `,

		// @@--- Resolvers are the functions that run when a query or mutation is executed--@@
		resolvers: {
			Query: {
				...User.resolvers.queries,
			},
			Mutation: {
				...User.resolvers.mutations,
			},
		},
	});
  
	await server.start();
	return server;
}

export default createApolloGraphqlServer;
