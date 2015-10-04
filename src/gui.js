export default class Gui{
    constructor(){
      this.scale = 20;
      this.body = document.querySelector('body');
      this.controls = document.querySelector('#controls');
      this.containers = [];

      this.colors = ['red', 'blue'];
    }

    addPlayer(player){
      var container = document.createElement('span');
      container.style.backgroundColor = this.colors.pop();
      this.body.appendChild(container);
      this.containers.push(container);
      this.appendPosition(container, player.position)
    }

    appendPosition(playerContainer, position){
      var newPositionElement = document.createElement('span');
      newPositionElement.className = 'position';
      newPositionElement.style.top = this.getPixelPosition(position.y);
      newPositionElement.style.left = this.getPixelPosition(position.x);
      playerContainer.appendChild(newPositionElement);
    }

    appendMove(playerContainer, position, move){
      var top = Math.min(position.y, position.y + move.y);
      var left = Math.min(position.x, position.x + move.x);
      var height = Math.abs(move.y);
      var width = Math.abs(move.x);

      var hasTopToTheLeft = (move.x > 0 && move.y > 0) || (move.x < 0 && move.y < 0);
      var orientationClass = hasTopToTheLeft ? 'top-left' : 'top-right';

      var moveElement = document.createElement('span');
      moveElement.className = 'move ' + orientationClass;
      moveElement.style.top = this.getPixelPosition(top);
      moveElement.style.left = this.getPixelPosition(left);
      moveElement.style.width = this.getPixelPosition(width);
      moveElement.style.height = this.getPixelPosition(height);
      playerContainer.appendChild(moveElement);
    }

    getPixelPosition(ordinate){
      return ordinate * this.scale + "px";
    }

    drawControls(vector){
      this.controls.style.top = this.getPixelPosition(vector.y);
      this.controls.style.left = this.getPixelPosition(vector.x);
    }
}
