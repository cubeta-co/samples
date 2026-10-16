// On each request, calls API_URL (another app's internalUrl) and reports
// whether it answered: "reached: pong" on the same private network,
// "unreachable: <error>" otherwise.
const http = require("node:http");
http.createServer(async (_, res) => {
  try {
    const answer = await fetch(process.env.API_URL, { signal: AbortSignal.timeout(5000) });
    res.end(`reached: ${(await answer.text()).trim()}\n`);
  } catch (e) {
    res.end(`unreachable: ${e.cause?.code || e.name}\n`);
  }
}).listen(process.env.PORT || 8080, "0.0.0.0");
