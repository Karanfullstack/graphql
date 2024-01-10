import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";

const app = express();
const PORT = Number(process.env.PORT) || 5000;
app.use(express.json());

// setting up server
const startServer = async () => {
	const server = new ApolloServer({
		typeDefs: `
      type Query {
        hello: String!
        sayName(name:String):String
      }
    `,
		resolvers: {
			Query: {
				hello: () => "Hello World",
				sayName: (_, {name}: {name: string}) => `Hey ${name}`,
			},
		},
	});

	await server.start();
	app.use("/graphql", expressMiddleware(server));
	// starting graphql server

	app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

startServer();
