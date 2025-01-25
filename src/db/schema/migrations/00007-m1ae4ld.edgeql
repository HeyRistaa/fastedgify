CREATE MIGRATION m1ae4ldum25lrfynmx5pf7w6i32ihtlveluq347gkvuw3pyze3z6ba
    ONTO m1mw7xtnrgc6y5oqyr5kfno7m33dvlysjmaxwlz6v3gk6xcexfjsra
{
  ALTER TYPE default::User {
      CREATE PROPERTY password: std::str;
  };
};
