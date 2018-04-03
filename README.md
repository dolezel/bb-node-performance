# bb-node-performance

BrownBag about node.js performance

* [libuv](https://en.wikipedia.org/wiki/Libuv) + [v8](https://developers.google.com/v8/) + sauce = node.js
* see [https://github.com/nodejs/node](https://github.com/nodejs/node)

## Single threaded ?!

See [event loop](https://docs.google.com/presentation/d/1ghQLMrpuE0rm5H0qJ3naOCE73xzU53DJE-vuiIoUydA/) brownbag

![libuv architecture](http://docs.libuv.org/en/v1.x/_images/architecture.png)

## Node internals

Example:
* https://github.com/nodejs/node/blob/master/lib/internal/crypto/pbkdf2.js
* https://github.com/nodejs/node/blob/master/src/node_crypto.cc#L4967

It looks like [C++ Addons](https://docs.google.com/presentation/d/1MeefJ3TxcyO9zBfOUmUY5qWx78qVaSU2jdayl0rtz4E/) :astonished:

## Time for code

### Threads

```bash
npm run start:measure quiz
```

### Clusters

```bash
npm run start:cluster simple
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
npm run start:cluster simple
```
