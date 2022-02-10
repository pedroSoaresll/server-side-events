# How to start

open the server and front directory and install the dependencies

# How to test

start server with

```sh
$ node server.js
```

open another terminal tab and start the front

```sh
$ yarn start
```

---

open the front application in browser at address `http://localhost:3001` after open the dev tools at network tab. You'll see the `events` item, open it to oberse events arriving.

---

open another terminal tab, copy and past the code below, send it to terminal, look the network in dev tools or application content, you will have an update. Send the same code again and again and you will see the events arriving to the front application.

### Send server events

```sh
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"info": "Shark teeth are embedded in the gums rather than directly affixed to the jaw, and are constantly replaced throughout life.", "source": "https://en.wikipedia.org/wiki/Shark"}'\
 -s http://localhost:3000/fact

```
