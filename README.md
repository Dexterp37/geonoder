geonoder
========

A NodeJS client for geocoding/reverse address lookup with plug-in services.

Supported Providers
-------------------

* Google
* Nominatim

Installation
------------
To install this module in your project issue this command

    npm install geonoder

Usage
-----
Find the latitude and longitude of a given street address using Google as a provider. 

``` js
var geonoder = require('geonoder')

var plebiscitoAddress = 'Via del Plebiscito, 102 00186 Roma'

geonoder.toCoordinates(plebiscitoAddress, geonoder.providers.google, function(lat, long) {
    console.log('Lat: ' + lat + ' Long: ' + long) // Lat: 41.8965209 Long: 12.4805225
})
```

Perform a reverse geocoding, find the street address associated with a given latitude and longitude pair.

``` js
var geonoder = require('geonoder')

var plebiscitoLat = 41.8965209
var plebiscitoLong = 12.4805225

geonoder.toAddress(plebiscitoLat, plebiscitoLong, geonoder.providers.google, function(address) {
    console.log('Address: ' + address) // 'Via del Plebiscito, 102 00186 Roma'
})
```

Tests
-----
All tests are written using [mocha](https://github.com/visionmedia/mocha). To install and run the tests:

    npm install -g mocha
    mocha -R list

Bug Reporting
-------------
To file a bug report, please use the project's [issue tracker](https://github.com/Dexterp37/geonoder/issues).

Roadmap
-------
- Add other free services
- Add a caching mechanism

License
-------
This project is released under the terms of the MIT license. You can find a copy of the license in the LICENSE file. 
