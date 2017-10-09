'use strict';
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