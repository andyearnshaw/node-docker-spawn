import fs from "fs";

const pipeRead = fs.createReadStream('', { fd: 3 });
const pipeWrite = fs.createWriteStream('', { fd: 4 });

pipeRead.on("data", (message) => {
  if (String(message) === "PING?") {
    pipeWrite.write("PONG!");
  }
});
