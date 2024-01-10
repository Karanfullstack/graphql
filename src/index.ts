import express from "express";
import createApolloGraphqlServer from "./graphql";
import {expressMiddleware} from "@apollo/server/express4";
import {prismaConnection} from "./DB/db";

// Middlewares
const app = express();
app.use(express.json());

// Port
const PORT = Number(process.env.PORT) || 5000;

// setting up server
const init = async () => {
	// DB Connection
	prismaConnection();

	// starting graphql server
	const server = await createApolloGraphqlServer();
	// setting up graphql server
	app.use("/graphql", expressMiddleware(server));
	// starting graphql server

	// starting server
	app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

init();
