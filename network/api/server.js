// Answers "pong" to anyone who can reach it.
const http = require("node:http");
http.createServer((_, res) => res.end("pong\n")).listen(process.env.PORT || 8080, "0.0.0.0");
