import client from "../client/client";
import e from "../schema/edgeql-js";
import type { ActorInput } from "../types/db-types";

export const addActor = async (name: string): Promise<ActorInput> => {
    const result = e.insert(e.Actor, {
        name
    }).run(client);

    return result;
}