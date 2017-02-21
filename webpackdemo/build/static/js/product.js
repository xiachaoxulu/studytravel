webpackJsonp([1,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	 var tool = __webpack_require__(4);
	 // ...

	 function sayHello2(arg) {

	     console.log(tool.ajax(arg))
	 }

	 sayHello2('xiachao');


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	function ajax(abc) {


	    return 'hello:' + abc;
	}


	export default {
	    ajax: ajax
	}


/***/ }
]);