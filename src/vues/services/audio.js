var storage = require('./storage');

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var masterGain = context.createGain();
masterGain.connect(context.destination);
masterGain.gain.value = storage.GetIsMuted() ? 0 : 0.5;

export function ToggleIsMuted() {
  var isMuted = !storage.GetIsMuted();
  storage.SetIsMuted(isMuted);
  masterGain.gain.value = isMuted ? 0 : 0.5;
  return isMuted;
}

var click;
loadArrayBuffer('sounds/click2.wav', context, buffer => click = buffer);

export function playClick(){
  var sound = createSourceAndGain(click);
  sound.gainNode.gain.value = 0.5;
  sound.source.start(0);
}

var ambientSounds = [];
var ambientSoundUrls = [
  'sounds/sirens-of-amygdala.wav', //http://freesound.org/people/ERH/sounds/31041/
  'sounds/blaster-1.wav', //http://freesound.org/people/ERH/sounds/30304/
  'sounds/boom-2.wav', //http://freesound.org/people/ERH/sounds/30261/
  'sounds/boom-3.wav', //http://freesound.org/people/ERH/sounds/30262/
  'sounds/wind.ogg', //http://freesound.org/people/Black%20Boe/sounds/22331/
];
ambientSoundUrls.forEach(
  (url, index) => loadArrayBuffer(url, context,
    buffer => {
      ambientSounds.push(buffer);
      if(index === 0) scheduleAmbientSound();
    }));

function scheduleAmbientSound(){
  var buffer = ambientSounds[Math.floor(Math.random() * ambientSounds.length)];
  var duration = buffer.duration;
  var fadeTime = randomInt(5, 15);
  var silence = randomInt(5, 25);

  var gain = random(0.2, 0.5);
  var sound = createSourceAndGain(buffer);
  var source = sound.source;
  var gainNode = sound.gainNode;
  var currTime = context.currentTime;
  gainNode.gain.linearRampToValueAtTime(0, currTime);
  gainNode.gain.linearRampToValueAtTime(gain, currTime + fadeTime);
  source.start(0);
  gainNode.gain.linearRampToValueAtTime(gain, currTime + duration - fadeTime);
  gainNode.gain.linearRampToValueAtTime(0, currTime + duration);

  setTimeout(() => scheduleAmbientSound(), (duration - fadeTime + silence) * 1000);
}

function loadArrayBuffer(url, context, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';
  request.onload =
    () => context.decodeAudioData(request.response,
      buffer => callback(buffer), error => console.log(error));
  request.send();
}

function createSourceAndGain(buffer){
  var gainNode = context.createGain();
  gainNode.connect(masterGain);

  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(gainNode);
  source.connect(masterGain);
  return { source, gainNode};
}

function randomInt(min, max) {
  return Math.floor(random(min, max));
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
