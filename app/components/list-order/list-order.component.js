'use strict';
angular.module("shopApp.listOrder", [
]).component("listOrder", {
	templateUrl: "./components/list-order/list-order.template.html",
	controller: ['$scope', 'GridCommonConf', '$filter', 'OrderService',
		function ($scope, gridCommonConf, $filter, orderService) {
		var comp = this;
		
		var comp = this;
		
		comp.orderFilter = {refreshCount: 0};
		var buildColumns = function () {
			return [
				{title: "id", field: "id"},
				{
					title: "Product", field: "productId",
					template: function (dataItem) {
						return dataItem.productName;
					},
					editor: function (container, options) {
						
						var msg = "Please choose a product"
						var el = '<input required name="productId" data-required-msg="'+msg+'"/>'
						var	elName = $('<input type="text" name="productName"/>')
						var input = $(el);
						input.appendTo(container);
						elName.appendTo(container);
						orderService.orderRes.getAvailableProducts().$promise.then(function (res) {
							var handleSelect = function(e) {
									console.log(e.item);
									console.log(res)
									console.log(options.model)
									options.model.productName = e.item.name
							}
							
							input.kendoDropDownList({
								optionLabel: $filter('i18n')('Select...'),
								dataSource: res.data,
								dataTextField: "name",
								dataValueField: "_id",
								valuePrimitive: true,
								value: options.model.productId,
								select: handleSelect,
								template: function(dataItem) {
									return dataItem.name+": "+dataItem.color+": "+dataItem.quality;
								}
							});
						});
						var tooltipElement = $('<span class="k-invalid-msg" data-for="' + options.field + '"></span>');
						tooltipElement.appendTo(container);
					}
				},
				{title: "Price", field: "price"},
				{title: "Quality", field: "quality"},
				{title: "Customer Name", field: "customerName"},
				{title: "Phone", field: "phone"},
				{title: "Address", field: "address"},
				{title: "Status", field: "status"},
				{
					title: "Created Date", field: "createdDate",
					template: function (dataItem) {
						return $filter("date")(dataItem.createdDate, gridCommonConf.dateFormatWithTime)
					}
				},
				{
					title: "Modified Date", field: "lastModifiedDate",
					template: function (dataItem) {
						return $filter("date")(dataItem.lastModifiedDate, gridCommonConf.dateFormatWithTime)
					}
				},
				{command: ["edit", "destroy"], title: "&nbsp;"}
			]
		}
		var model = {
			id: "_id",
			fields: {
				id: {editable: false},
				productId: {type: "string"},
				productName: {type: "string"},
				price: {type: "number"},
				quality: {type: "number"},
				customerName: {type: "string"},
				phone: {type: "number"},
				address: {type: "string"},
				status: {type: "string"},
				createdDate: {type: "date", editable: false},
				lastModifiedDate: {type: "date", editable: false}
			}
		};
		
		var refreshGrid = function (e) {
			comp.orderFilter.refreshCount++;
			$scope.$apply();
			gridCommonConf.showMsgFromCompleteResponse(e);
		}
		var dataSource = gridCommonConf.buildGridDataSource(apiHost + "/order", model, comp.orderFilter);
		dataSource.transport.create.complete = refreshGrid;
		dataSource.transport.destroy.complete = refreshGrid;
		dataSource.transport.update.complete = refreshGrid;
		comp.listOrderGridOption = gridCommonConf.buildGridOption(dataSource, undefined, buildColumns());
		
		
	}]
})
require("./list-order.service.js");