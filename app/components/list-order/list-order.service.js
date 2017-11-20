/**
 * Created by willo on 11/9/17.
 */
angular.module("shopApp.listOrder").factory("OrderService",
	['$resource', function($resource){
	var service = {};
	
	service.orderRes = $resource('', {}, {
		getAvailableProducts: {
			isArray: false,
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			url: apiHost+ "/productsAvailable"
		},
	});
	
	return service;
}])