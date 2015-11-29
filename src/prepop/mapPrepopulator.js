var storage = require('../storage');

export function prepopulateMaps(cb) {
  var request = new XMLHttpRequest();
  request.open('GET', 'src/prepop/data.json', true);
  request.responseType = 'json';
  request.onload =
    () => {
      var maps = request.response;
      maps.forEach(map => storage.AddMap(map));
      cb(maps);
    }
  request.send();
}
