const request = require('request');

let json;

request.get({
    url: 'http://localhost:3002/brands',
    body: json,
    json: true,
}, function (error, response, body) {
    console.log(body);
});
