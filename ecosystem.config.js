module.exports = {
  apps: [
    {
      name: "ATAS - Frontend",
      cwd: "./client/",
      script: "yarn",
      args: "start",
      watch: "*",
      watch_delay: 1000,
    },
    {
      name: "ATAS - Backend",
      script: "./server/dist/index.js",
      watch: "*",
      watch_delay: 1000,
    },
  ],
};
