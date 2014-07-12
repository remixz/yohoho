## yohoho

A wrapper around the [official Yo API](http://dev.justyo.co/yo/docs.html), for both the browser and Node.js. Arr!

[![NPM](https://nodei.co/npm/yohoho.png?compact=true)](https://nodei.co/npm/yohoho/)

### Browser Usage

Unfortunately, Yo has decided to not make their API routes CORS compatible right now. So, to use this in the browser, you'll need to use a CORS proxy. To do this, I've made it so you can set your own host. Take a look in the usage section below.

### Installation

Node.js:

```
npm install yohoho
```

Browser:

I personally recommend using Browserify on the npm module. However, you can also include `dist/yohoho.js`, which exposes itself as `yohoho` on the `window`.

### Usage

Every function calls a callback `function (err, body) {}`. `err` is any error in the request, and `body` is the response from the server, or a boolean for a request that just indicates success.

```js
var yohoho = require('yohoho'); // if you're using node/browserify

// grab an API token from http://dev.justyo.co/, if you don't have one
var yo = yohoho('API_TOKEN');

// if you're using this in the browser, you'll need to set the host to a CORS proxy. example:
var yo = yohoho('API_TOKEN', { host: 'http://www.corsproxy.com/api.justyo.co' });

// send a yo to an individual username from your API account
yo.yo('USERNAME', function (err, success) {
    // returns `true` when successful
});

// sends a yo to all of your subscribers from your API account
yo.yoAll(function (err, success) {
    // returns `true` when successful
});

// returns the amount of subscribers your API account has
yo.countSubscribers(function (err, subscribers) {
    // returns the number of subscribers
});
```
