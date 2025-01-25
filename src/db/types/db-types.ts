export type Movie = { 
    title: unknown; 
    actors: { name: string; }[]; 
}

export type ActorInput = {
    id: string;
    name?: string;
}

export type UserInput = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    clerkId: string;
    password: string;
}