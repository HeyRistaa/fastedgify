CREATE MIGRATION m1oewrscohnghn6c3vmow3q5mghvhe35ywaebirm5jn373myhhsqpa
    ONTO m1fjar63snkcf6u2ekwys6owwd6c3myhx7m3qotfnewjea4bslewsa
{
  ALTER TYPE default::Payment {
      ALTER PROPERTY amount {
          SET TYPE std::str USING (<std::str>.amount);
      };
  };
};
