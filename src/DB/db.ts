import {PrismaClient} from "@prisma/client";

export const prisma = new PrismaClient({
	log: ["query"],
});

// prisma connection
export const prismaConnection = () => {
	prisma
		.$connect()
		.then(() => console.log("Connected to DB"))
		.catch((err) => {
			console.log("Error connecting to DB");
			prisma.$disconnect();
			process.exit(1);
		});
};
