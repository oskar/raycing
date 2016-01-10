var Paper = require('paper');

var animations = [];

function remove(animation){
  animations = animations.filter(a => a !== animation);
}

function onFrame(event){
  if(event.delta === 0) return;
  animations.forEach(animation => {
    animation.elapsedTime += event.delta;
    var continueAnimation = animation.callback(animation.elapsedTime);
    if(continueAnimation === false) {
      remove(animation);
    }
  });
}

export function init(){
  Paper.view.onFrame = onFrame;
}

export function add(callback){
  var animation = {
    callback,
    elapsedTime: 0
  };
  animations.push(animation);
  return {
    remove: () => remove(animation)
  };
}
