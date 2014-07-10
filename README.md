## yohoho

A wrapper around the [official Yo API](http://dev.justyo.co/yo/docs.html), for both the browser and Node.js. Arr!

[![NPM](https://nodei.co/npm/yohoho.png?compact=true)](https://nodei.co/npm/yohoho/)

### Note

As of me writing this README, the Yo API doesn't support CORS, so it can't be used in the browser yet. I've sent an email to Yo, asking if they'll change that. Once they do, this will work in the browser.

### Installation

Node.js:

```
npm install yohoho
```

Browser:

I personally recommend using Browserify on the npm module. However, you can also include `dist/yohoho.js`, which exposes itself as `yohoho` on the `window`.

### Usage

Every function calls a callback `function (err, body) {}`. `err` is any error in the request, and `body` is the response from the server.

```js
var yohoho = require('yohoho'); // if you're using node/browserify

var yo = yohoho('API_TOKEN'); // grab an API token from http://dev.justyo.co/, if you don't have one

// send a yo to an individual username from your API account
yo.yo('USERNAME', function (err, body) {
    // returns { result: 'OK' } when successful
});

// sends a yo to all of your subscribers from your API account
yo.yoAll(function (err, body) {
    // returns {} when successful
});

// returns the amount of subscribers your API account has
yo.countSubscribers(function (err, body) {
    // returns a result in this format: { result: 1 }
});
```
