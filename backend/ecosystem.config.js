module.exports = {
  apps: [
    {
      name: 'app1',
      script: '/app/dist/src/main.js',
      env_production: {
        JWT_SECRET: 'df56e3397961d9f44008e62ae5ef6d84',
        POSTGRES_PASSWORD: 'student',
        POSTGRES_DB: 'kupipodariday',
        POSTGRES_USER: 'student',
        POSTGRES_HOST: 'localhost',
        POSTGRES_PGDATA: '/var/lib/postgresql/data/pgdata',
      },
    },
  ],
};
