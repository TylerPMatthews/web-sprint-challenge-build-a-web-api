const express = require("express");
const helmet = require("helmet");
const actionRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

server.use(helmet());
server.use(express.json());

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectsRouter);

//Default path

server.get("/", (req, res) => {
  res.json({
    test: "This is a test endpoint",
  });
});

module.exports = server;
