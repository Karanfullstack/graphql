import {UserLoginPayload} from "./../../services/user.service";
import UserService, {UserCreatePayload} from "../../services/user.service";
import Utils from "../../utils";

const queries = {};

// --@mutations-users
const mutations = {
	createUser: async (
		_: any,
		payload: UserCreatePayload
	): Promise<string | undefined> => {
		try {
			const response = await UserService.createUser(payload);
			return response.id;
		} catch (error: any) {
			console.log(error);
			throw new Error(`Some error while creating user ${error.messages}`);
		}
	},

	// --@login_user
	loginUser: async (_: any, payload: UserLoginPayload): Promise<string> => {
		try {
			const response = await UserService.loginUser(payload);
			return response;
		} catch (error: any) {
			console.log(error.messsage);
			throw new Error("Error While Login User...");
		}
	},
};

export const resolvers = {queries, mutations};
