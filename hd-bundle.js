(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// var fs = require('fs');
var read = require('read-file');
// var interleave = require('loose-interleave');
// var Chance = require('chance');
// var chance = new Chance();

// var openFile = function(event) {
// 	var input = event.target;
// 	var reader = new FileReader();
// 	reader.onload = function() {
// 		corpus = reader.result;
// 	}
// 	reader.readAsText("files/some imagist poets.txt");
// }

// console.log(corpus);

var corpus = read.sync('files/some imagist poets.txt');
console.log(corpus);
},{"read-file":2}],2:[function(require,module,exports){
/**
 * read-file <https://github.com/assemble/read-file>
 *
 * Copyright (c) 2014, 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

var fs = require('fs');

function read(fp, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }

  if (typeof cb !== 'function') {
    throw new TypeError('read-file async expects a callback function.');
  }

  if (typeof fp !== 'string') {
    cb(new TypeError('read-file async expects a string.'));
  }

  fs.readFile(fp, opts, function (err, buffer) {
    if (err) return cb(err);
    cb(null, normalize(buffer, opts));
  });
}

read.sync = function(fp, opts) {
  if (typeof fp !== 'string') {
    throw new TypeError('read-file sync expects a string.');
  }
  try {
    return normalize(fs.readFileSync(fp, opts), opts);
  } catch (err) {
    err.message = 'Failed to read "' + fp + '": ' + err.message;
    throw new Error(err);
  }
};

function normalize(str, opts) {
  str = stripBom(str);
  if (typeof opts === 'object' && opts.normalize === true) {
    return String(str).replace(/\r\n|\n/g, '\n');
  }
  return str;
}

function stripBom(str) {
  return typeof str === 'string' && str.charAt(0) === '\uFEFF'
    ? str.slice(1)
    : str;
}

/**
 * Expose `read`
 */

module.exports = read;
},{"fs":3}],3:[function(require,module,exports){

},{}]},{},[1]);
