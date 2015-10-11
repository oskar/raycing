var Paper = require('paper');

export function victorToPoint(victor){
  return new Paper.Point(victor.x, victor.y);
}
