CREATE MIGRATION m1mw7xtnrgc6y5oqyr5kfno7m33dvlysjmaxwlz6v3gk6xcexfjsra
    ONTO m163euk3denlydmww2s5sfhhkhtojbyzuyv4wmua3ve4l4htprkrvq
{
  CREATE TYPE default::User {
      CREATE PROPERTY clerkId: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY firstName: std::str;
      CREATE PROPERTY lastName: std::str;
  };
};
