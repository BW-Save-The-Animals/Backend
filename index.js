const server = require("./server");

const PORT = 5600;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
