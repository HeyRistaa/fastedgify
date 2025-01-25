CREATE MIGRATION m1viwi7wyrevapfeg3i67crfafb4oy535e6ih55ymdd6spyjetr26a
    ONTO m1me2awaowv4buqtsbtlscljcfl6iip6yf753zwq5ntkzfgginpjra
{
  CREATE TYPE default::Payment {
      CREATE PROPERTY accountNumber: std::str;
      CREATE PROPERTY amount: std::int32;
      CREATE PROPERTY date: std::datetime;
      CREATE PROPERTY lastName: std::str;
      CREATE PROPERTY name: std::str;
  };
};
