import {prisma} from "../DB/db";
import Utils from "../utils";

class UserService {
	public static createUser(payload: UserCreatePayload) {
		try {
			const {firstName, lastName, email, password} = payload;
			// @@-hasing password
			const {hashedPassword, salt} = Utils.createHashedPassword(password);
			return prisma.user.create({
				data: {
					firstName,
					lastName,
					email,
					password: hashedPassword,
					salt,
				},
			});
		} catch (error) {
			throw error;
		}
	}

// @--getting user by email
	public static getUserByEmail(email: string) {
		return prisma.user.findUnique({
			where: {
				email,
			},
		});
	}
	
	// @@-login user
	public static async loginUser(payload: UserLoginPayload) {
		try {
			const {email, password} = payload;
			const user = await this.getUserByEmail(email);
			if (!user) throw new Error("User not found");

			// @@-check password
			const salt = user.salt;
			const {hashedPassword} = Utils.createHashedPassword(
				password,
				salt as string
			);
			if (hashedPassword !== user.password) throw new Error("Invalid password");
			const token = Utils.JWT({id: user.id, email: user.email});
			return token;
		} catch (error) {
			throw error;
		}
	}

	// --@get current user;
	public static getCurrentUser(id: string) {
		return prisma.user.findUnique({
			where: {id},
		});
	}
}

export default UserService;

export interface UserCreatePayload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface UserLoginPayload {
	email: string;
	password: string;
}
