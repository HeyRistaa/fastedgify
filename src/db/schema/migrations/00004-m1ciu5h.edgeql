CREATE MIGRATION m1ciu5hj52sd664vfhmdehwlrphdow7d2qwfthrwfdfpbzlu6n3rdq
    ONTO m1hw4r7puc24yahryhwq4ksgn4fivop7w3i5oayorpc5gbmgkahxiq
{
  ALTER TYPE default::Person RENAME TO default::Actor;
  DROP TYPE default::Site;
};
