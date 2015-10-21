var Paper = require('paper');

export function changeCenter(oldCenter, offset, factor) {
  offset = offset.multiply(factor);
  return offset;
}

export function changeZoom(oldZoom, delta, center, position){
  var factor = 1.05
  var newZoom = delta < 0 ? oldZoom * factor : oldZoom / factor;
  var beta = oldZoom / newZoom;
  var pc = position.subtract(center);
  var offset = position.subtract(pc.multiply(beta)).subtract(center);
  return {newZoom, offset};
}
