CREATE MIGRATION m1fjar63snkcf6u2ekwys6owwd6c3myhx7m3qotfnewjea4bslewsa
    ONTO m1viwi7wyrevapfeg3i67crfafb4oy535e6ih55ymdd6spyjetr26a
{
  ALTER TYPE default::Payment {
      CREATE PROPERTY country: std::str;
  };
};
