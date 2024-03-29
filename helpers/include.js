/*jshint node:true, laxcomma:true */
"use strict";

var path = require('path')
  , basename = path.basename(__filename, '.js')
  , debug = require('debug')('castor:' + basename)
  , util = require('util')
  , assert = require('assert')
  ;

module.exports = function(basedir, modname) {
  if (modname === undefined) {
    modname = basedir;
    basedir = '';
  }
  assert(typeof basedir, 'string');
  assert(typeof modname, 'string');
  var module = path.join(basedir, modname);
  try {
    module = require.resolve(module);
    return require(module);
  }
  catch (e) {
    try {
      module = require.resolve(modname);
      return require(module);
    }
    catch(e) {
      throw new Error(util.format('Unknown (or Missing or Error in) Module `%s`\n  %s',
                      modname, e));
    }
  }
};

