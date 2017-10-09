'use strict';
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