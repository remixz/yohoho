/**
 * Yohoho - Node.js API wrapper around official Yo API.
 *
 * @package yohoho
 * @author Zach Bruggeman <zachb@diy.org>
 */

var request = require('request');
var qs      = require('querystring');

// the yo api needs a trailing slash apparently
var API_HOST = 'http://api.justyo.co/{{ROUTE}}/';

module.exports = function (token) {
    if (!token) throw new Error('An API token is required. Visit http://dev.justyo.co to get an API account.');

    return {
        yo: function (username, callback) {
            var body = qs.stringify({
                api_token: token,
                username: username
            });

            request({
                uri: API_HOST.replace('{{ROUTE}}', 'yo'),
                method: 'POST',
                json: true,
                form: body
            }, function (err, resp, body) {
                if (typeof body === 'string' && body.indexOf('Rate limit exceeded') !== -1) {
                    return callback(body, null);
                }

                callback(err, body);
            });
        },

        yoAll: function (callback) {
            var body = qs.stringify({
                api_token: token
            });

            request({
                uri: API_HOST.replace('{{ROUTE}}', 'yoall'),
                method: 'POST',
                json: true,
                form: body
            }, function (err, resp, body) {
                if (typeof body === 'string' && body.indexOf('Rate limit exceeded') !== -1) {
                    return callback(body, null);
                }

                callback(err, body);
            });
        },

        countSubscribers: function (callback) {
            request({
                uri: API_HOST.replace('{{ROUTE}}', 'subscribers_count'),
                method: 'GET',
                json: true,
                qs: { api_token: token }
            }, function (err, resp, body) {
                if (typeof body === 'string' && body.indexOf('Rate limit exceeded') !== -1) {
                    return callback(body, null);
                }

                callback(err, body);
            });
        }
    }
}
