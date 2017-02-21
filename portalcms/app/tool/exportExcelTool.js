/**
* @Created Date       : 2016-11-11T15:54:05+08:00
* @Last Modified time : 2016-11-29T14:26:33+08:00
*/



var $defaults = {
  datatype: 'json',
  dataset: [],
  columns: [],
  returnUri: false,
  worksheetName: "My Worksheet",
  fileName: '工作档案',
  encoding: "utf-8"
};

var $settings = {};

var exportExcelTool = function(options) {
  $settings.containerid = options.containerid || $defaults.containerid;
  $settings.datatype = options.datatype || $defaults.datatype;
  $settings.dataset = options.dataset || $defaults.dataset;
  $settings.columns = options.columns || $defaults.columns;
  $settings.returnUri = options.returnUri || $defaults.returnUri;
  $settings.worksheetName = options.worksheetName || $defaults.worksheetName;
  $settings.encoding = options.encoding || $defaults.encoding;
  $settings.fileName = options.fileName || $defaults.fileName;


  var gridData = [];
  var excelData;

  return Initialize();

  function Initialize() {
    var type = $settings.datatype.toLowerCase();

    BuildDataStructure(type);

    switch (type) {

      case 'json':
        excelData = Export(ConvertDataStructureToTable());
        break;
    }

    if ($settings.returnUri) {
      return excelData;
    } else {
      createDownloadLink(excelData);
    }
  }

  function b64toBlob(b64Data, contentType, sliceSize) {

    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = window.atob(b64Data);
    var byteArrays = [];

    var offset;
    for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      var i;
      for (i = 0; i < slice.length; i = i + 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new window.Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new window.Blob(byteArrays, {
      type: contentType
    });
    return blob;
  }

  function createDownloadLink(base64data) {
    var blob;
    var exporttype = "application/vnd.ms-excel";
    var filename = $settings.fileName + ".xls";


    if (window.navigator.msSaveBlob) {
      blob = b64toBlob(base64data, exporttype);
      window.navigator.msSaveBlob(blob, filename);
      return false;
    } else {
      var anchor = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      var event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      if (window.URL.createObjectURL) {
        blob = b64toBlob(base64data, exporttype);
        var blobUrl = window.URL.createObjectURL(blob, exporttype);
        anchor.download = filename;
        anchor.href = blobUrl;
        anchor.dispatchEvent(event);
      } else {
        var hrefvalue = "data:" + exporttype + ";base64," + base64data;
        anchor.download = filename;
        anchor.href = hrefvalue;
        anchor.dispatchEvent(event);
      }
    }
    return true;
  }

  function BuildDataStructure(type) {
    switch (type) {
      case 'table':
        break;
      case 'json':
        gridData = $settings.dataset;
        break;
    }
  }


  function ConvertDataStructureToTable() {
    var result = "<table>";

    result += "<thead><tr>";
    $settings.columns.forEach(function(item) {
      if (!item.ishidden) {
        result += "<th";
        if (item.width != null) {
          result += " style='width: " + item.width + "'";
        }
        result += ">";
        result += item.headertext;
        result += "</th>";
      }
    });
    result += "</tr></thead>";

    result += "<tbody>";
    gridData.forEach(function(item) {
      result += "<tr>";
      $settings.columns.forEach(function(citem) {
        if (item.hasOwnProperty(citem.datafield)) {
          if (!citem.ishidden) {
            result += "<td";
            if (citem.width != null) {
              result += " style='width: " + citem.width + "'";
            }
            result += ">";
            result += item[citem.datafield];
            result += "</td>";
          }
        }
      });
      result += "</tr>";
    });
    result += "</tbody>";

    result += "</table>";
    return result;
  }

  function Export(htmltable) {
    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += "<head>";
    excelFile += '<meta http-equiv="Content-type" content="text/html;charset=' + $settings.encoding + '" />';
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>";
    excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += htmltable.replace(/"/g, '\'');
    excelFile += "</body>";
    excelFile += "</html>";


    var ctx = { worksheet: $settings.worksheetName, table: htmltable };
    return base64(format(excelFile, ctx));
  }

  function base64(s) {
    return window.btoa(unescape(encodeURIComponent(s)));
  }

  function format(s, c) {
    return s.replace(/{(\w+)}/g, function(m, p) {
      return c[p];
    });
  }
}

module.exports={
  exportExcelTool:exportExcelTool
}  
