CREATE MIGRATION m13rzjhkonx2nu4qe7t4sva4zpvncs5alrkisucmyylo6w7gchb3aa
    ONTO m1w6r43gw42bu6yb7osbehvtz5ec7zeo4c3a3zkz4dctorq6ljyb6a
{
  DROP FUTURE nonrecursive_access_policies;
  ALTER TYPE default::Base {
      DROP PROPERTY createdAt;
  };
  ALTER TYPE default::Category {
      DROP LINK posts;
      DROP PROPERTY name;
  };
  ALTER TYPE default::Post {
      DROP LINK categories;
  };
  DROP TYPE default::Category;
  ALTER TYPE default::`Group` {
      DROP LINK editablePosts;
      DROP LINK groupRoles;
  };
  ALTER TYPE default::User {
      DROP LINK groups;
      DROP LINK groupRoles;
      DROP LINK authoredPosts;
      DROP LINK editablePosts;
      DROP LINK viewablePosts;
  };
  ALTER TYPE default::`Group` {
      DROP LINK members;
      DROP LINK owner;
      DROP LINK viewablePosts;
      DROP PROPERTY name;
  };
  DROP TYPE default::GroupRole;
  DROP TYPE default::Post;
  DROP TYPE default::`Group`;
  ALTER TYPE default::Profile {
      DROP LINK user;
      DROP PROPERTY bio;
  };
  DROP TYPE default::User;
  DROP TYPE default::Profile;
  DROP TYPE default::Base;
  CREATE TYPE default::Person {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Movie {
      CREATE MULTI LINK actors: default::Person;
      CREATE PROPERTY title: std::str;
  };
  DROP SCALAR TYPE default::Role;
};
