'use strict';

// Declare app level module which depends on views, and components
angular.module('shopApp', [
  'ngRoute',
  'kendo.directives',
  'shopApp.listItem',
  'shopApp.listOrder',
  'localization',
  'ngResource',
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

angular.module('shopApp').controller('HomeController',
  ['$rootScope','$location','$scope','$window',
  function($rootScope, $location, $scope, $window){
 $scope.checkLogin = function() {
   var url ="http://" + $window.location.host + "/login.html";
 	$window.location.href= url;
 }
}])
require("./components/list-item/list-item.component");
require("./components/list-order/list-order.component");
require("./app.localization");
require("./gridCommonConf");
