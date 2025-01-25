import client from "../client/client";
import e from "../schema/edgeql-js";
import type { Movie } from "../types/db-types";

export const getMoviesByName = async (name: string): Promise<Movie[]> => {
    const result = await e
        .select(e.Movie, (movie: any
        ) => ({
            title: movie.title,
            actors: { name: true },
            filter: e.op(movie.title, "ilike", `%${name}%`)
        }))
        .run(client);

    return result;
}

export const getMoviesByActorName = async (name: string): Promise<Movie[] | null> => {
    const foundActors = await e.select(e.Actor, (actor: any) => ({
        name: true,
        filter: e.op(actor.name, "ilike", `%${name}%`)
    })).run(client);

    if (foundActors.length === 0) {
        return null;
    }
    
    const result = await e
        .select(e.Movie, (movie: any) => ({
            title: movie.title,
            actors: { name: true },
            filter: e.op(movie.actors.name, "in", e.set(...foundActors.map(a => a.name)))
        }))
        .run(client);

    return result;
}