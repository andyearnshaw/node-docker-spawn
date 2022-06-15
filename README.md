This repo was created to demonstrate an issue when trying to communicate with processes launched
with `docker run`, where they have been spawned from a Node.js process using extra stdio pipes:

```javascript
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
```

These processes work as expected when running on the host machine, but the pipes are not set up
properly when using `docker run`:

```javascript
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
```

A [Stack Overflow question][1] has been created to gather potential solutions to this problem.

[1]:
    https://stackoverflow.com/questions/72567756/node-js-spawn-docker-run-command-with-extra-streams

## Running the example

The example uses a Jest test suite to demonstrate the behaviour on both the host machine and the
docker container. Simply run the following to get it to work:

```sh
npm install
npm test
```
