const jsonServer = require("json-server");
const fs = require("fs");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1"
  })
);
server.use(router);
const dbPath = "db.json";
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "{}", "utf8");
}
fs.chmodSync(dbPath, "777");
server.listen(3001, () => {
  console.log("JSON Server is running");
});
module.exports = server;
