var bottom = document.getElementById('menuBottom');
var menuClickZoneTopLeft = document.getElementById('menuClickZone-topLeft');
var menuClickZonetopRight = document.getElementById('menuClickZone-topRight');


export function smallClickzones(){
  menuClickZoneTopLeft.classList.add('menuClickZone-small');
  menuClickZonetopRight.classList.add('menuClickZone-small');
}

export function bigClickzones(){
  menuClickZoneTopLeft.classList.remove('menuClickZone-small');
  menuClickZonetopRight.classList.remove('menuClickZone-small');
}

export function hideBottom(){
  bottom.classList.add('menu-hidden');
}

export function showBottom(){
  bottom.classList.remove('menu-hidden');
}
