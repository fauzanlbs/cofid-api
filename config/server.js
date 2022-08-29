// const cronTasks = require("./cron-tasks")

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'd2da4d1afcce25b8a08c2728170601a5'),
    },
  },
  cron: {
    enabled: true
    // tasks: cronTasks
  }
});
