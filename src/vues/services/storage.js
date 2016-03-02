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

function GetUserConfigValue(key, defaultValue) {
  var config = GetUserConfig();

  if(config[key] === undefined) {
    config[key] = defaultValue;
    SetUserConfig(config);
  }

  return config[key];
}

function SetUserConfigValue(key, value) {
  var config = GetUserConfig();
  config[key] = value;
  SetUserConfig(config);
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

export function Get(key){
  return JSON.parse(localStorage.getItem(key));
}

export function AddMap(map) {
  localStorage.setItem(map.key, JSON.stringify(map));
}

export function RemoveMap(map) {
  localStorage.removeItem(map.key);
}

export function SetNbrOfPlayers(nbrOfPlayers) {
  SetUserConfigValue('nbrOfPlayers', nbrOfPlayers);
}

export function GetNbrOfPlayers() {
  return GetUserConfigValue('nbrOfPlayers', 2);
}

export function GetIsMuted() {
  return GetUserConfigValue('isMuted', false);
}

export function SetIsMuted(isMuted) {
  SetUserConfigValue('isMuted', isMuted);
}

export function GetEnableStars() {
  return GetUserConfigValue('enableStars', true);
}

export function SetEnableStars(enableStars) {
  SetUserConfigValue('enableStars', enableStars);
}
