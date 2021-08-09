module.exports = {
  apps: [
    {
      name: "ATAS - Frontend",
      cwd: "./client/",
      script: "yarn",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "ATAS - Backend",
      script: "./server/dist/index.js",
      env: {
        API_PORT: "5050",
        NODE_ENV: "production",
      },
    },
  ],
};
