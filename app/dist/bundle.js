/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Declare app level module which depends on views, and components
angular.module('shopApp', [
  'ngRoute',
  'kendo.directives',
  'shopApp.listItem',
  'shopApp.listOrder',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.when('/listProduct', {
  	template:"<list-item></list-item>"
  }).when('/listOrder',{
  	template:"<list-order></list-order>"
  })
  $routeProvider.otherwise({redirectTo: '/listProduct'});
}]);

__webpack_require__(1);
__webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

angular.module("shopApp.listItem",[]).component("listItem", {
	templateUrl:"./components/list-item/list-item.template.html",
	controller: ['$scope', function($scope) {
		var comp = this;

		var buildColumns = function() {
			return [
				{title:"Item Name", field:"FirstName"},
				{title:"Item Size", field:"LastName"},
				{title:"Item Color", field:"LastName"},
				{title:"Item Input Price", field:"LastName"},
				{title:"Item Output Price", field:"LastName"},
				{title:"Quality", field:"LastName"},
				{title:"Source", field:"LastName"},
				{title:"Item status", field:"LastName"},
				{command: ["edit", "destroy"], title: "&nbsp;"}
			]
		}
		var buildDataSource = function() {
			return {
				type:"odata",
				transport: {
					read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees",
				},
				schema: {
            model: {
							id: "ProductID",
							fields: {
								ProductID: { editable: false, nullable: true },
								ProductName: { validation: { required: true } },
								UnitPrice: { type: "number", validation: { required: true, min: 1} },
								Discontinued: { type: "boolean" },
								UnitsInStock: { type: "number", validation: { min: 0, required: true } }
							}
					}
				},
				pageSize:2
			}
		}
		comp.listItemGridOption = {
			dataSource:buildDataSource(),
			columns:buildColumns(),
			sortable:true,
			pageable: true,
      toolbar: ["create"],
			editable:{
				mode:"incell"
			}
		};

	}]
})

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

angular.module("shopApp.listOrder",[]).component("listOrder", {
	templateUrl:"./components/list-order/list-order.template.html",
	controller: ['$scope', function($scope) {
		var comp = this;

		var buildColumns = function() {
			return [
				{title:"Item name", field:"FirstName"},
				{title:"Item Size", field:"LastName"},
				{title:"Item Color", field:"LastName"},
				{title:"Item Price", field:"LastName"},
				{title:"Quality", field:"LastName"},
				{title:"Customer Name", field:"LastName"},
				{title:"Customer Phone", field:"LastName"},
				{title:"Customer Address", field:"LastName"},
				{command: ["edit", "destroy"], title: "&nbsp;"}
			]
		}
		var buildDataSource = function() {
			return {
				type:"odata",
				transport: {
					read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees",
				},
				schema: {
            model: {
							id: "ProductID",
							fields: {
								ProductID: { editable: false, nullable: true },
								ProductName: { validation: { required: true } },
								UnitPrice: { type: "number", validation: { required: true, min: 1} },
								Discontinued: { type: "boolean" },
								UnitsInStock: { type: "number", validation: { min: 0, required: true } }
							}
					}
				},
				pageSize:2
			}
		}
		comp.listItemGridOption = {
			dataSource:buildDataSource(),
			columns:buildColumns(),
			sortable:true,
			pageable: true,
      toolbar: ["create"],
			editable:{
				mode:"incell"
			}
		};

	}]
})

/***/ })
/******/ ]);