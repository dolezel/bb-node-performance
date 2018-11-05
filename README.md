# bb-node-performance

BrownBag about node.js performance

- [libuv](https://en.wikipedia.org/wiki/Libuv) + [v8](https://developers.google.com/v8/) + sauce = node.js
- see [https://github.com/nodejs/node](https://github.com/nodejs/node)

## Single threaded ?!

See [event loop](https://docs.google.com/presentation/d/1ghQLMrpuE0rm5H0qJ3naOCE73xzU53DJE-vuiIoUydA/) brownbag

![libuv architecture](http://docs.libuv.org/en/v1.x/_images/architecture.png)

## Node internals

Example:

- https://github.com/nodejs/node/blob/v10.x/lib/internal/crypto/pbkdf2.js
- https://github.com/nodejs/node/blob/v10.x/src/node_crypto.cc#L4706

It looks like [C++ Addons](https://docs.google.com/presentation/d/1MeefJ3TxcyO9zBfOUmUY5qWx78qVaSU2jdayl0rtz4E/) :astonished:

### Little offtopic - new promise API

- https://github.com/nodejs/node/blob/v10.x/lib/internal/fs/promises.js

## Time for code

### Threads

```bash
npm run start:measure simple
npm run start:measure single
npm run start:measure queue
npm run start:measure pool
npm run start:measure pool+1
npm run start:measure 2*pool
npm run start:measure cpus
npm run start:measure cpus-2
npm run start:measure quiz
```

### Clusters

```bash
npm run start:cluster simple
npm run start:cluster single
npm run start:cluster cluster
npm run start:cluster cpus
npm run start:cluster 2*cpus
```

```bash
# sudo apt install apache2-utils
ab -c 10 -n 10 http://localhost:3000/
```

### Workers

```bash
npm i webworker-threads
```

```bash
npm run start:workers eval
npm run start:workers worker
npm run start:workers native
```
