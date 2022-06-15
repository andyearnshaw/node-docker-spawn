import { spawn } from "child_process";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("on host", () => {
  let child;

  afterEach(() => child?.kill('SIGINT'));

  it("responds with PONG! when PING? is sent", async () => {
    child = spawn(
      "/usr/bin/env",
      [
        "node",
        "ponger.js"
      ],
      {
        stdio: ['ignore', 'inherit', 'inherit', 'pipe', 'pipe']
      }
    );

    await new Promise((resolve, reject) => {
      child.stdio[4].on('data', (message) => {
        if (String(message) === "PONG!") {
          resolve();
        }
        else {
          reject();
        }
      });
      child.stdio[3].write("PING?");
    });
  });
});

describe("on docker container", () => {
  let child;

  afterEach(() => child?.kill('SIGINT'));

  it("responds with PONG! when PING? is sent", async () => {
    child = spawn(
      "/usr/bin/env",
      [
        "docker",
        "run",
        "--rm",
        "--init",
        "--ipc=host",
        `-v=${ __dirname }:/usr/app`,
        "node:latest",
        "node",
        "/usr/app/ponger.js"
      ],
      {
        stdio: ['ignore', 'inherit', 'inherit', 'pipe', 'pipe']
      }
    );

    await new Promise((resolve, reject) => {
      child.stdio[4].on('data', (message) => {
        if (String(message) === "PONG!") {
          resolve();
        }
        else {
          reject();
        }
      });
      child.stdio[3].write("PING?");
    });
  });
});
