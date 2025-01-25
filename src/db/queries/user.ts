import client from "../client/client";
import e from "../schema/edgeql-js";
import type { UserInput } from "../types/db-types";
import bcrypt from "bcrypt";

export const addUser = async (email: string, firstName: string, lastName: string, clerkId: string, password: string): Promise<UserInput> => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await e.insert(e.User, {
        email,
        firstName,
        lastName,
        clerkId,
        password: hashedPassword
    }).run(client);

    return { id: result.id, email, firstName, lastName, clerkId } as UserInput;
}

export const getUserByEmail = async (email: string): Promise<UserInput | null> => {
    const result = await e.select(e.User, (user) => ({
        filter_single: e.op(user.email, "=", email)
    })).run(client);
    
    return result as UserInput | null;
}