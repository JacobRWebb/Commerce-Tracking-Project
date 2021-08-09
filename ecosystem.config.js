module.exports = {
  apps: [
    {
      name: "ATAS - Frontend",
      cwd: "./client/",
      script: "yarn",
      args: "start",
    },
    {
      name: "ATAS - Backend",
      script: "./server/dist/index.js",
    },
  ],
};
