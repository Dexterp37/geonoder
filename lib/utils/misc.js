/*
 * Check if a value is a number.
 * http://stackoverflow.com/a/1830844/261698
 */
exports.isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}