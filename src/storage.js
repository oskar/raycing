function GetUserConfig() {
  var config = localStorage.getItem('UserConfig');
  if(!config) {
    config = {};
    SetUserConfig(config);
  }
  return JSON.parse(config);
}

function SetUserConfig(config) {
  localStorage.setItem('UserConfig', JSON.stringify(config));;
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
  SetUserConfig(config);
}

export function GetNbrOfPlayers() {
  var nbrOfPlayers = GetUserConfig().nbrOfPlayers;
  if(!nbrOfPlayers) {
    nbrOfPlayers = 2;
    var config = GetUserConfig();
    config.nbrOfPlayers = nbrOfPlayers;
    SetUserConfig(config);
  }
  return nbrOfPlayers;
}

export function GetIsMuted() {
  var isMuted = GetUserConfig().isMuted;
  if(!isMuted) {
    isMuted = false;
    var config = GetUserConfig();
    config.isMuted = isMuted;
    SetUserConfig(config);

  }
  return isMuted;
}

export function SetIsMuted(isMuted) {
  var config = GetUserConfig();
  config.isMuted = isMuted;
  SetUserConfig(config);
}
