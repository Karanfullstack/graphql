import express from "express";
import createApolloGraphqlServer from "./graphql";
import {expressMiddleware} from "@apollo/server/express4";
import {prismaConnection} from "./DB/db";
import Utils from "./utils";

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
	app.use(
		"/graphql",
		expressMiddleware(server, {
			context: async ({req}) => {
				try {
					const token = req.headers["token"] as string;
					const user = Utils.JWT_DECODE(token);
					return {user};
				} catch (error) {
					return {};
				}
			},
		})
	);
	// starting graphql server

	// starting server
	app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

init();
