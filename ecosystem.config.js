module.exports = {
  apps: [
    {
      name: "ATAS - Frontend",
      cwd: "./client/",
      script: "yarn",
      args: "start",
      interpreter: "/bin/bash",
    },
    {
      name: "ATAS - Backend",
      script: "./server/dist/index.js",
    },
  ],
};
