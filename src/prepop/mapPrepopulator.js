export function prepopulateMaps(cb) {
  var request = new XMLHttpRequest();
  request.open('GET', 'src/prepop/data.json', true);
  request.responseType = 'json';
  request.onload =
    () => {
      var maps = request.response;
      maps.forEach(map => localStorage.setItem(map.key, JSON.stringify(map)));
      cb(maps);
    }
  request.send();
}
