module.exports = {
  apps: [
    {
      name: "hands_and_eyes",
      script: "./hands_and_eyes/.next/standalone/server.js",
      env: {
        PORT: 5600,
        NODE_ENV: "production",
      },
      out_file: "./logs/hands_and_eyes/info.log",
      error_file: "./logs/hands_and_eyes/error.log",
      time: true,
    },
  ],
};
