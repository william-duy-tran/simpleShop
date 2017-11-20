'use strict';
angular.module("shopApp.listItem", []).component("listItem", {
	templateUrl: "./components/list-item/list-item.template.html",
	controller: ['$scope','GridCommonConf','$filter', function ($scope, gridCommonConf, $filter) {
		var comp = this;
		
		comp.orderFilter = {refreshCount:0};
		var buildColumns = function () {
			return [
				{title:"id", field:"id"},
				{title: $filter("i18n")("Item Name"), field: "name"},
				{title: $filter("i18n")("Item Size & color"),
					field: "size", width:"200px"},
				{title: $filter("i18n")("color"), field: "color"},
				{title: $filter("i18n")("Item Input Price"), field: "inputPrice"},
				{title: $filter("i18n")("Item Output Price"), field: "outputPrice"},
				{title: $filter("i18n")("Quality"), field: "quality"},
				{title: $filter("i18n")("Source"), field: "source"},
				{title: $filter("i18n")("Item status"), field: "status"},
				{title: $filter("i18n")("Created Date"), field:"createdDate",
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
				name:{type:"string", validation:{required:true}},
				size:{type:"string", validation:{required:true}},
				color:{type:"string", editable: false},
				inputPrice:{type:"number", validation:{required:true}},
				outputPrice:{type:"number"},
				quality:{type:"number", editable: false},
				source:{type:"string"},
				status:{type:"string", validation:{required:true}},
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