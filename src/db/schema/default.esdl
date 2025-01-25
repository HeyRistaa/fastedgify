module default {
  type Actor {
    required name: str;
  }

  type Movie {
    title: str;
    multi actors: Actor;
  }

  type User {
    email: str {
      constraint exclusive;
    };
    firstName: str;
    lastName: str;
    clerkId: str;
    password: str;
  }
};
