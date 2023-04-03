const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST" && req.path === "/chat-history") {
    const chatHistory = router.db.get("chat-history").value();
    if (chatHistory.length > 7) {
      router.db.get("chat-history").remove({ id: chatHistory[0].id }).write();
    }
  }
  next();
});

server.use(router);
server.listen(port, () => {
  console.log("App listening on post: " + port);
});
