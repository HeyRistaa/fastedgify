CREATE MIGRATION m1mth4vpwny6vf5jf5yrpqjyfige5mmvfzd4s3nhm7x7fjoqpzgg4a
    ONTO m1oewrscohnghn6c3vmow3q5mghvhe35ywaebirm5jn373myhhsqpa
{
  ALTER TYPE default::Payment {
      ALTER PROPERTY amount {
          SET TYPE std::int32 USING (<std::int32>.amount);
      };
  };
};
