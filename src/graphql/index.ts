import {ApolloServer} from "@apollo/server";
import {User} from "./user";

async function createApolloGraphqlServer() {
	const server = new ApolloServer({
		typeDefs: ` 
     type Query {
			 hello: String
		 }
		 type Mutation {
			${User.mutations}
		 }
    `,
		resolvers: {
			Query: {
				...User.resolvers.queries,
			},
			Mutation: {
				...User.resolvers.mutations,
			},
		},
	});
	console.log(...User.mutations);
	await server.start();
	return server;
}

export default createApolloGraphqlServer;
