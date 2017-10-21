angular.module("Blue").factory("GridCommonConf", ['$filter', '$rootScope', function ($filter, $rootScope) {
  var common = {};
  common.dateFormat = "yyyy/MM/dd";
  common.pageable = {
    pageSizes: true,
    messages: {
      empty: $filter("i18n")("gridNoData"),
      itemsPerPage: $filter("i18n")("gridItemsPerPage"),
      display: "{0} - {1} " + $filter("i18n")("gridItemOf") + " {2} " + $filter("i18n")("gridItems")
    }
  };
  common.calculateTotal = function (res) {
    return res.data.length;
  }
  common.CRUDErrorChecker = function (responseFromServer) {
    if (responseFromServer.status === false) {
      return responseFromServer.processMessage;
    };
  }
  common.CRUDErrorHandler = function (e) {
    swal("", $filter('i18n')(e.errors), "");
    this.cancelChanges();
  }
  common.toolbarCreate = { name: "create", text: "{{'addNewRecord'|i18n}}" }
  common.editBtn = {
    name: "edit", text: { edit: "{{'rowEdit'|i18n}}", cancel: "{{'rowCancel'|i18n}}", update: "{{'rowUpdate'|i18n}}" }
  }
  common.destroyBtn = { name: "destroy", text: "{{'rowDestroy'|i18n}}" }
  common.pageSize = 10;
  common.registerKeyupEvent = function (e) {
    console.log("TODO: register keyup event need to customize");
    $("input:text").unbind("keyup");
    $("input:text").keyup(function (e) {
      var input = $(this);
      setTimeout(function () {
        var keyToIgnore = [91, 17, 65, 67, 8, 37, 38, 39, 40];
        if (keyToIgnore.indexOf(e.keyCode) > -1) {
          return;
        }
        input.val(input.val().replace(/[^a-zA-Z0-9- _\[\]@]\./g, ""));
      }, 50);
    });
  };
  //starndard REST url: 
  //list: GET /api/holiday
  //create: POST /api/holiday
  //update: PUT /api/holiday
  //delete: DELETE /api/holiday
  common.buildGridDatasource = function (restUrl, kendoModel) {
    return {
      transport: {
        read: {
          url: restUrl,
          contentType: 'application/json; charset=utf-8',
          dataType: "json",
        },
        update: {
          url: restUrl,
          dataType: "json",
          contentType: 'application/json; charset=utf-8',
          method: "PUT"
        },
        destroy: {
          url: restUrl,
          dataType: "json",
          contentType: 'application/json; charset=utf-8',
          method: "DELETE"
        },
        create: {
          url: restUrl,
          dataType: "json",
          contentType: 'application/json; charset=utf-8',
          method: "POST"
        },
        parameterMap: function (options, operation) {
          if (operation !== "read" && options) {
            return kendo.stringify(options);
          } else {
            return options;
          }
        }
      },
      requestEnd: common.registerKeyupEvent,
      pageSize: common.pageSize,
      sort: { field: "id", dir: "asc" },
      filterable: {
        extra: false,
        operators: {
          string: {
            startswith: "Starts with",
            eq: "Is equal to",
            neq: "Is not equal to"
          }
        }
      },
      schema: {
        data: "data",
        total: function (res) {
          return res.data.length;
        },
        errors: common.CRUDErrorChecker,
        model: kendoModel
      },
      error: common.CRUDErrorHandler,
    };
  };

  common.buildGridOption = function (dataSource, height, columns) {
    return {
      dataSource: dataSource,
      pageable: common.pageable,
      height: height,
      sortable: true,
      filterable: true,
      resizable: true,
      scrollable: false,
      toolbar: [common.toolbarCreate],
      columns: columns,
      editable: "inline",
      edit: function () {
        setTimeout(common.registerKeyupEvent, 50);
      },
      noRecords: {
        template: $filter("i18n")("gridNoData")
      }


    }
  };

  return common;
}]);