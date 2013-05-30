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

var assert = require('assert')
var geonoder = require('../lib/geonoder')

describe('geonoder', function() {

    describe('isLatitudeValid', function() {

        it('should return false when the value is a string', function(){
            assert.equal(false, geonoder.isLatitudeValid('test'));
        })

        it('should return false when the value is not passed', function(){
            assert.equal(false, geonoder.isLatitudeValid());
        })

        it('should return false when the value is null', function(){
            assert.equal(false, geonoder.isLatitudeValid(null));
        })

        it('should return false when the value is less than -90°', function(){
            assert.equal(false, geonoder.isLatitudeValid(-91.5));
        })

        it('should return false when the value is more than 90°', function(){
            assert.equal(false, geonoder.isLatitudeValid(91.5));
        })

        it('should return true when the value is in the -90 + 90 range', function(){
            assert.equal(true, geonoder.isLatitudeValid(12.5));
        })
    });

    describe('isLongitudeValid', function() {

        it('should return false when the value is a string', function(){
            assert.equal(false, geonoder.isLongitudeValid('test'));
        })

        it('should return false when the value is not passed', function(){
            assert.equal(false, geonoder.isLongitudeValid());
        })

        it('should return false when the value is null', function(){
            assert.equal(false, geonoder.isLongitudeValid(null));
        })

        it('should return false when the value is less than -180°', function(){
            assert.equal(false, geonoder.isLongitudeValid(-191.5));
        })

        it('should return false when the value is more than 180°', function(){
            assert.equal(false, geonoder.isLongitudeValid(185));
        })

        it('should return true when the value is in the -180 + 180 range', function(){
            assert.equal(true, geonoder.isLongitudeValid(42.7));
        })
    });

});
