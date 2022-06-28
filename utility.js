var log = function (message = "", type = "log") {
  if (type === "log") {
    console.log(message);
  }

  if (type === "error") {
    console.error(message);
  }

  if (type === "warn") {
    console.warn(message);
  }
};

function hideNotification() {
  document.querySelector("#notification-content").innerHTML = "";
  document.querySelector("#notification").classList.add("hide");
}

function showNotification(text) {
  document.querySelector("#notification-content").innerHTML = text;
  document.querySelector("#notification").classList.remove("hide");
  setTimeout(hideNotification, 3000);
}

var ExcelToJSON = function () {
  this.parseExcel = function (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheetName]
        );
        var json_object = JSON.stringify(XL_row_object);
        console.log(JSON.parse(json_object));
        // jQuery("#xlx_json").val(json_object);
        pass(JSON.parse(json_object));
      });
      showNotification("excel uploaded successfully");
    };

    reader.onerror = function (ex) {
      console.log(ex);
      showNotification(ex);
    };

    reader.readAsBinaryString(file);
  };
};

function copyToClipboard(commaSeparatedValue) {
  var textArea = document.createElement("textarea");
  textArea.value = commaSeparatedValue;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}