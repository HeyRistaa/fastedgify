CREATE MIGRATION m1hw4r7puc24yahryhwq4ksgn4fivop7w3i5oayorpc5gbmgkahxiq
    ONTO m13rzjhkonx2nu4qe7t4sva4zpvncs5alrkisucmyylo6w7gchb3aa
{
  CREATE TYPE default::User {
      CREATE REQUIRED PROPERTY email: std::str;
  };
  CREATE TYPE default::Site {
      CREATE REQUIRED MULTI LINK users: default::User;
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY url: std::str;
  };
};
