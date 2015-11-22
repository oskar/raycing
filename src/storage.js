function GetUserConfig() {
  var config = localStorage.getItem('UserConfig');
  if(!config) {
    config = {
      nbrOfPlayers: 2
    };
    localStorage.setItem('UserConfig', JSON.stringify(config));
  }

  return JSON.parse(config);
}

export function GetMaps() {
  var maps = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if(key.indexOf('map') === 0) {
      maps.push(JSON.parse(localStorage.getItem(key)));
    }
  }

  return maps;
}

export function AddMap(map) {
  localStorage.setItem(map.key, JSON.stringify(map));
}

export function RemoveMap(map) {
  localStorage.removeItem(map.key);
}

export function SetNbrOfPlayers(nbrOfPlayers) {
  var config = GetUserConfig();
  config.nbrOfPlayers = nbrOfPlayers;
  localStorage.setItem('UserConfig', JSON.stringify(config));
}

export function GetNbrOfPlayers() {
  return GetUserConfig().nbrOfPlayers;
}
