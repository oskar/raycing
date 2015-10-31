var Paper = require('paper');

var animations = [];

function stop(index){
  animations.splice(index, 1);
}

function onFrame(event){
  if(event.delta === 0) return;
  animations.forEach((animation, index) => {
    animation.elapsedTime += event.delta;
    var continueAnimation = animation.callback(animation.elapsedTime);
    if(continueAnimation === false) {
      stop(index);
    }
  });
}

export function init(){
  Paper.view.onFrame = onFrame;
}

export function add(callback){
  animations.push({
    callback,
    elapsedTime: 0
  });
}
