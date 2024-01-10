const queries = {};
const mutations = {
	createUser: async (_:any,{firstName, lastName}:{firstName:string, lastName:string}) => {
		return "randomid";
	},
};

export const resolvers = {queries, mutations};
