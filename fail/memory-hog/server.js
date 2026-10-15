// Listens, then keeps allocating memory outside the JavaScript heap until the
// container's limit stops it: expect APP_OUT_OF_MEMORY.
const http = require("node:http");
http.createServer((_, res) => res.end("ok\n")).listen(process.env.PORT || 8080, "0.0.0.0");
const kept = [];
setInterval(() => kept.push(Buffer.alloc(64 * 1024 * 1024, 1)), 200);
