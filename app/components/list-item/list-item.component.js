'use strict';
angular.module("shopApp.listItem", []).component("listItem", {
	templateUrl: "./components/list-item/list-item.template.html",
	controller: ['$scope','GridCommonConf','$filter', function ($scope, gridCommonConf, $filter) {
		var comp = this;
		
		comp.orderFilter = {refreshCount:0};
		var buildColumns = function () {
			return [
				{title:"id", field:"id"},
				{title: "Item Name", field: "name"},
				{title: "Item Size", field: "size"},
				{title: "Item Color", field: "color"},
				{title: "Item Input Price", field: "inputPrice"},
				{title: "Item Output Price", field: "outputPrice"},
				{title: "Quality", field: "quality"},
				{title: "Source", field: "source"},
				{title: "Item status", field: "status"},
				{title: "Created Date", field:"createdDate",
					template: function(dataItem){
					return $filter("date")(dataItem.createdDate, gridCommonConf.dateFormatWithTime)
				}},
				{title: "Modified Date", field:"lastModifiedDate",
					template: function(dataItem){
						return $filter("date")(dataItem.lastModifiedDate, gridCommonConf.dateFormatWithTime)
					}},
				{command: ["edit", "destroy"], title: "&nbsp;"}
			]
		}
		var model = {
			id: "_id",
			fields: {
				id:{editable: false},
				name:{type:"string"},
				size:{type:"number"},
				color:{type:"string"},
				inputPrice:{type:"number"},
				outputPrice:{type:"number"},
				quality:{type:"number"},
				source:{type:"string"},
				status:{type:"string"},
				createdDate:{type:"date", editable:false},
				lastModifiedDate:{type:"date", editable:false}
			}
		};
		
		var refreshGrid = function(e) {
			comp.orderFilter.refreshCount++;
			$scope.$apply();
			gridCommonConf.showMsgFromCompleteResponse(e);
		}
		var dataSource= gridCommonConf.buildGridDataSource(apiHost+"/product",model, comp.orderFilter);
		dataSource.transport.create.complete = refreshGrid;
		dataSource.transport.destroy.complete = refreshGrid;
		dataSource.transport.update.complete = refreshGrid;
		comp.listItemGridOption= gridCommonConf.buildGridOption(dataSource, undefined, buildColumns());
		
		
	}]
})