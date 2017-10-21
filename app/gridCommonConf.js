angular.module("shopApp").factory("GridCommonConf", ['$filter', '$rootScope', function ($filter, $rootScope) {
  var common = {};
  common.hardCoded = {
    DetailTypeTable: 'blu tax exempt',
    DetailTypeName: 'stateTax',
    commodityList: [{ key: "Electric", text: $filter("i18n")("Electric") },
        { key: "Gas", text: $filter("i18n")("Gas") },
        { key: "Solar", text: $filter("i18n")("Solar") }]
  };
  common.dateFormat = "yyyy/MM/dd";
  common.dateFormatWithTime = "dd/MMM/yyyy h:mm";
  common.yenSymbol = "¥";
  common.pageSize = 10;
  common.pageable = {
    pageSizes: [10, 20, 50],
    pageSize: common.pageSize,
    numeric: true,
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

  common.requestJsonCommon = { //use for reinit GET data after event received
    contentType: 'application/json; charset=utf-8',
    dataType: "json"
  };

  //starndard REST url: 
  //list: GET /api/holiday
  //create: POST /api/holiday
  //update: PUT /api/holiday
  //delete: DELETE /api/holiday
  common.buildGridDataSource = function (restUrl, kendoModel, readData) {
    return {
      transport: {
        read: {
          url: restUrl,
          contentType: 'application/json; charset=utf-8',
          dataType: "json",
          data: readData
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
          	if (operation === "create") {
          	  delete options._id;
            }
            return kendo.stringify(options);
          } else {
            return options;
          }
        }
      },
      sort: { field: "lastModifiedDate", dir: "desc" },
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
          if (res.data === null) return 0;
          return res.data.length;
        },
        errors: common.CRUDErrorChecker,
        model: kendoModel
      },
      error: common.CRUDErrorHandler,
    };
  };

  common.buildGridOption = function (dataSource, height, columns) {
    var templateNoRecords = $filter("i18n")("gridNoData");
    return {
      dataSource: dataSource,
      pageable: {
        pageSizes: [10, 20, 50],
        pageSize: common.pageSize,
        numeric: true,
        messages: {
          empty: $filter("i18n")("gridNoData"),
          itemsPerPage: $filter("i18n")("gridItemsPerPage"),
          display: "{0} - {1} " + $filter("i18n")("gridItemOf") + " {2} " + $filter("i18n")("gridItems")
        }
      },
      height: height,
      sortable: true,
      filterable: true,
      resizable: true,
      scrollable: true,
      toolbar: [common.toolbarCreate],
      columns: columns,
      editable: {
        createAt: "top",
        mode: "inline",
        confirmation: $filter("i18n")("are.you.sure")
      },
      edit: function () {
        setTimeout(common.registerKeyupEvent, 50);
      },
      noRecords: {
        template: templateNoRecords
      }
    }
  };
  common.exportToExcel = function (gridId, aLinkSelector) {
    var grid = $("#" + gridId).data("kendoGrid");

    // use grid.dataSource.data() to export all data and not just the current page
    var data = grid.dataSource.view();

    var file = {
      worksheets: [{
        data: []
      }],
      creator: 'CES BLUE JAPAN',
      created: new Date(),
      lastModifiedBy: 'CES BLUE JAPAN',
      modified: new Date(),
      activeWorksheet: 0
    };

    var worksheetData = file.worksheets[0].data;
    var worksheetDataHeader = [];

    worksheetData.push(worksheetDataHeader);

    for (var ci = 0; ci < grid.columns.length; ci++) {
      var title = grid.columns[ci].title || grid.columns[ci].field;
      worksheetDataHeader.push({
        value: title,
        autoWidth: true
      });
    }

    for (var di = 0; di < data.length; di++) {
      var dataItem = data[di];
      var worksheetDataItem = [];

      for (ci = 0; ci < grid.columns.length; ci++) {
        var column = grid.columns[ci];
        console.log(column.field);
        worksheetDataItem.push({
          value: dataItem.get(column.field)
        });
      }

      worksheetData.push(worksheetDataItem);
    }

    console.log(this);
    var result = xlsx(file);

    return result.href();

    //if (navigator.msSaveBlob) {
    //  var blob = new Blob([base64DecToArr(result.base64)]);

    //  navigator.msSaveBlob(blob, this.getAttribute("download"));
    //} else {
    //  this.href = result.href();
    //}

  };
  common.showMsgFromCompleteResponse = function (e) {
    var msg = e.responseJSON.processMessage;
    if (msg !== "" || msg !== null) {
      swal("", $filter("i18n")(msg.trim()), "");
    }
  };
  common.chkTemplate = '<input type="checkbox" #= KEYTOREPLACE===true ? "checked=checked" : "" # disabled="disabled"></input>';
  common.buildRequireMsg = function (colName) {
    return colName +" "+ $filter("i18n")("is.required");
  }
  return common;
}]);