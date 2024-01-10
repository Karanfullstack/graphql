import express from "express";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {prismaConnection} from "./DB/db";
import {prisma} from "./DB/db";
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
        getUsers:[User]
      } 
      type User {
        id:ID!
        firstName:String!
        lastName:String
        email:String!
        password:String!
        salt:String!
      }
      type Mutation{
        createUser(firstName:String!, lastName:String, email:String!, password:String!, salt:String):Boolean
      }
    `,
		resolvers: {
			Query: {
				hello: () => "Hello World",
				sayName: (_, {name}: {name: string}) => `Hey ${name}`,
				getUsers: async () => {
					const users = await prisma.user.findMany({});
					return users;
				},
			},
			Mutation: {
				createUser: async (
					_,
					{
						firstName,
						lastName,
						email,
						password,
						salt,
					}: {
						firstName: string;
						lastName: string;
						password: string;
						email: string;
						salt: string;
					}
				) => {
					try {
						await prisma.user.create({
							data: {
								firstName,
								lastName,
								email,
								password,
								salt,
							},
						});
						return true;
					} catch (error) {
						console.log(error);
					}
				},
			},
		},
	});

	await server.start();
	prismaConnection();
	app.use("/graphql", expressMiddleware(server));
	// starting graphql server

	app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

startServer();
