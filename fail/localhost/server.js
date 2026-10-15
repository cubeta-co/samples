// Listens on 127.0.0.1 only, ignoring HOST: expect APP_NOT_LISTENING.
const http = require("node:http");
http.createServer((_, res) => res.end("unreachable\n")).listen(process.env.PORT || 8080, "127.0.0.1", () => {
  console.log("listening on 127.0.0.1");
});
