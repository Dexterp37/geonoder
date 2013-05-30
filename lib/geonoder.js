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

var http = require('http')
  , miscUtils = require('./utils/misc.js');

var geonoder = exports;

geonoder.providers = {
    'google' : require('./providers/google'),
    'nominatim' : require('./providers/nominatim')
}

/**
 * Asynchronous function to compute the latitude and longitute starting by a given address (geocoding).
 * @param address a string containing the address for which coordinates are requested
 * @param provider a provider from the geonoder.providers list to use for the computation
 * @param callback a function with the signature (latitude, longitude). If arguments are null, then
 * there was an error while computing the coordinates.
 */
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
};

/**
 * Asynchronous function to compute address from a given pair of latitude and longitude.
 * @param lat a number representing the latitude
 * @param long a number representing the longitude
 * @param provider a provider from the geonoder.providers list to use for the computation
 * @param callback a function with the signature (address). If the argument is null, then
 * there was an error while computing the address.
 */
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
};

/**
 * Synchronous function used to check if the provided latitude value is valid.
 * @param lat a number representing the latitude
 * @return true if the given latitude is valid, false otherwise
 */
geonoder.isLatitudeValid = function(lat) {

    // lat is not a number.
    if (!miscUtils.isNumber(lat))
        return false;

    // lat should not fall outside the [-90 +90] range
    if (Math.abs(lat) > 90)
        return false;

    return true;
};

/**
 * Synchronous function used to check if the provided longitude value is valid.
 * @param long a number representing the longitude
 * @return true if the given longitude is valid, false otherwise
 */
geonoder.isLongitudeValid = function(long) {

    // lat is not a number.
    if (!miscUtils.isNumber(long))
        return false;

    // long should not fall outside the [-180 +180] range
    if (Math.abs(long) > 180)
        return false;

    return true;
};