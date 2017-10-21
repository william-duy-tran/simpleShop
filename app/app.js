'use strict';

// Declare app level module which depends on views, and components
angular.module('shopApp', [
  'ngRoute',
  'kendo.directives',
  'shopApp.listItem',
  'shopApp.listOrder',
  'localization',
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

require("./components/list-item/list-item.component");
require("./components/list-order/list-order.component");
require("./app.localization");
require("./gridCommonConf");
