webpackJsonp([1],{

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load all specs so webpack can find them. Think of this as an automatic
// manifest for bundling specs.

var req = __webpack_require__(54);
req.keys().forEach(req);

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./example.spec.js": 55
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 54;

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var example = __webpack_require__(7);

describe('Example', function () {
  it('is true', function () {
    expect(example).toBe(true);
  });
});

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = true;

/***/ })

},[53]);