module.exports = {
  apps: [
    {
      name: "vite-app",
      script: "./server.js",
      env: {
        NODE_ENV: "production",
        PORT: 3010
      },
    },
  ],
};
