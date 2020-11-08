function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object
  var xl2json = new ExcelToJSON();
  xl2json.parseExcel(files[0]);
}

const loadServiceWorker = () => {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => {
        log("Service worker is registered");
        log(registration);
      })
      .catch((err) => log("Service worker not registered", "error"));
  });
};

const registerServiceWorker = function () {
  if ("serviceWorker" in navigator) {
    log("Service worker supported in browser");
    loadServiceWorker();
  } else {
    log("Service worker not supported", "warn");
  }
};

document
  .getElementById("upload")
  .addEventListener("change", handleFileSelect, false);

// registerServiceWorker();
