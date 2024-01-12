import Jwt from "jsonwebtoken";

import {createHmac, randomBytes} from "node:crypto";

interface HashPasswordI {
	hashedPassword: string;
	salt: string;
}

interface JwtInterface {
	id: string;
	email: string;
}

class Utils {
	public static createHashedPassword(
		password: string,
		payload?: string
	): HashPasswordI {
		const salt = payload ? payload : randomBytes(32).toString("hex");
		const hashedPassword = createHmac("sha256", salt)
			.update(password)
			.digest("hex");
		return {salt, hashedPassword};
	}

	// jsonwebtoken utils
	public static JWT(payload: JwtInterface): string {
		return Jwt.sign(payload, process.env.JWT_SECRET as string, {
			expiresIn: "1d",
		});
	}

	// @decode token
	public static JWT_DECODE(token:string){
		 return Jwt.verify(token, process.env.JWT_SECRET as string)
	}
}

export default Utils;
