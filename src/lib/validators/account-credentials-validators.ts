import { z } from "zod";

export const AuthCredentialsValidator = z.object({
	email: z.string().email(),
	password: z.string().min(9, { message: "Invalid password, must be at least 8 characters long" })
});

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>;
