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

var queryString = require('querystring')
var objectUtils = require('../utils/objects')
var provider = exports;

provider.buildCoordinatesRequest = function(location, customOptions) {

    var providerOptions = objectUtils.mergeObjects({
        sensor: false,
        address: location
        },
        customOptions || {});

    return {
        method: 'GET',
        host: 'maps.googleapis.com',
        port: 80,
        path: '/maps/api/geocode/json?' + queryString.stringify(providerOptions)
    };
};

provider.parseCoordinatesResponse = function(response, callback) {

    // Should just be one location
    var locations = JSON.parse(response);

    if ( locations.results == null || locations.results[0] == null ) {
        callback(null, null);
    } else {
        callback(locations.results[0].geometry.location.lat, locations.results[0].geometry.location.lng);
    }
};

provider.buildAddressRequest = function(lat, long, customOptions) {

    var providerOptions = objectUtils.mergeObjects({
            sensor: false,
            latlng: lat + ',' + long
        },
        customOptions || {});

    return {
        method: 'GET',
        host: 'maps.googleapis.com',
        port: 80,
        path: '/maps/api/geocode/json?' + queryString.stringify(providerOptions)
    };
};

provider.parseAddressResponse = function(response, callback) {

    // Should just be one location
    var locations = JSON.parse(response);

    if ( locations.results == null || locations.results[0] == null ) {
        callback(null);
    } else {
        callback(locations.results[0].formatted_address);
    }
};