const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/bt-journaling-app_development",
      test: "postgres://postgres:postgres@localhost:5432/bt-journaling-app_test",
      e2e: "postgres://postgres:postgres@localhost:5432/bt-journaling-app_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
