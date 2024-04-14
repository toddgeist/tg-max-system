module.exports = {
  apps: [
    {
      name: "hands_and_eyes",
      script: "./prod/hands_and_eyes/server.js",
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
