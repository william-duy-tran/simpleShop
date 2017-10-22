'use strict';
angular.module("shopApp.listOrder", []).component("listOrder", {
	templateUrl: "./components/list-order/list-order.template.html",
	controller: ['$scope', 'GridCommonConf', '$filter', function ($scope, gridCommonConf, $filter) {
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
					// editor: function (container, option) {
					//
					// }
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