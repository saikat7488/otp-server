const http = require("http");
const app = require("./app");

//Conststant
const PORT = process.env.PORT || 5000;

//create http server
const server = http.createServer(app);

//listen
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
