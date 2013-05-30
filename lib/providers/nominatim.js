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
            q: location,
            format: 'json'
        },
        customOptions || {});

    return {
        method: 'GET',
        host: 'nominatim.openstreetmap.org',
        port: 80,
        path: '/search?' + queryString.stringify(providerOptions)
    };
};

provider.parseCoordinatesResponse = function(response, callback) {

    // Should just be one location
    var locations = JSON.parse(response);

    if (!locations || !locations[0]) {
        callback(null, null);
    } else {
        callback(locations[0].lat, locations[0].lon);
    }
};

provider.buildAddressRequest = function(lat, long, customOptions) {

    var providerOptions = objectUtils.mergeObjects({
            lat: lat,
            lon: long,
            format: 'json'
        },
        customOptions || {});

    return {
        method: 'GET',
        host: 'nominatim.openstreetmap.org',
        port: 80,
        path: '/reverse?' + queryString.stringify(providerOptions)
    };
};

provider.parseAddressResponse = function(response, callback) {

    // Should just be one location
    var locations = JSON.parse(response);

    if ( !locations || !locations.address ) {
        callback(null);
    } else {
        var formattedAddress = locations.address.road + ', ' + locations.address.postcode + ' ' + locations.address.city +
            ', ' + locations.address.country;

        callback(formattedAddress);
    }
};