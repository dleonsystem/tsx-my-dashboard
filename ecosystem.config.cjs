// ecosystem.config.js
module.exports = {
  apps: [{
    name: "my-dashboard-app",
    script: "npx",
    args: "serve dist -s -l 3010",
    interpreter: "none",
    exec_mode: "fork",
  }]
};