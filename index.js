/**
 * Yohoho - Node.js API wrapper around official Yo API.
 *
 * @package yohoho
 * @author Zach Bruggeman <zachb@diy.org>
 */

var request = require('request');
var qs      = require('querystring');

module.exports = function (token, opts) {
    if (!token) throw new Error('An API token is required. Visit http://dev.justyo.co to get an API account.');

    opts = opts || {};
    if (!opts.host) opts.host = 'http://api.justyo.co';

    return {
        yo: function (username, callback) {
            var body = qs.stringify({
                api_token: token,
                username: username
            });

            request({
                uri: opts.host + '/yo/',
                method: 'POST',
                json: true,
                form: body
            }, function (err, resp, body) {
                if (typeof body === 'string' && body.indexOf('Rate limit exceeded') !== -1) {
                    return callback(body, false);
                }

                if (err) return callback(err, false);
                callback(null, true);
            });
        },

        yoAll: function (callback) {
            var body = qs.stringify({
                api_token: token
            });

            request({
                uri: opts.host + '/yoall/',
                method: 'POST',
                json: true,
                form: body
            }, function (err, resp, body) {
                if (typeof body === 'string' && body.indexOf('Rate limit exceeded') !== -1) {
                    return callback(body, false);
                }

                if (err) return callback(err, false);
                callback(null, true);
            });
        },

        countSubscribers: function (callback) {
            request({
                uri: opts.host + '/subscribers_count/',
                method: 'GET',
                json: true,
                qs: { api_token: token }
            }, function (err, resp, body) {
                if (typeof body === 'string' && body.indexOf('Rate limit exceeded') !== -1) {
                    return callback(body, null);
                }

                if (err) return callback(err, null);
                callback(null, body.result);
            });
        }
    }
}
