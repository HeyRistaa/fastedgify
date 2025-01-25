CREATE MIGRATION m1me2awaowv4buqtsbtlscljcfl6iip6yf753zwq5ntkzfgginpjra
    ONTO m1ae4ldum25lrfynmx5pf7w6i32ihtlveluq347gkvuw3pyze3z6ba
{
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
