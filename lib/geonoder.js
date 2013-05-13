/**
 * Copyright (c) 2013 Alessio Placitelli - a.placitelli@a2p.it
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var http = require('http');

var geonoder = exports;

geonoder.providers = {
    'google' : require('./providers/google')
}

geonoder.toCoordinates = function(address, provider, callback) {

    // get HTTP request information as wanted by the chosen provider
    var requestInfo = provider.buildCoordinatesRequest(address, {});

    requestCallback = function(response) {
        var responseBody = '';

        // append newly arrived data to responseBody
        response.on('data', function (chunk) {
            responseBody += chunk;
        });

        // ok, we've finished.
        response.on('end', function () {
            provider.parseCoordinatesResponse(responseBody, callback);
        });
    }

    http.request(requestInfo, requestCallback).end();
}


geonoder.toAddress = function(lat, long,  provider, callback) {

    // get HTTP request information as wanted by the chosen provider
    var requestInfo = provider.buildAddressRequest(lat, long, {});

    requestCallback = function(response) {
        var responseBody = '';

        // append newly arrived data to responseBody
        response.on('data', function (chunk) {
            responseBody += chunk;
        });

        // ok, we've finished.
        response.on('end', function () {
            provider.parseAddressResponse(responseBody, callback);
        });
    }

    http.request(requestInfo, requestCallback).end();
}