var Car = require('./car');
var Victor = require('victor');

describe("A Car", function() {
  it("can move", function() {
    // Arrange
    var car = new Car(new Victor(0,0), new Victor(0,2));

    // Act
    car.move(new Victor(0,3));

    // Assert
    expect(car.position).toEqual(new Victor(0,3));
    expect(car.direction).toEqual(new Victor(0,3));

    // Act
    car.move(new Victor(1,4));

    // Assert
    expect(car.position).toEqual(new Victor(1,7));
    expect(car.direction).toEqual(new Victor(1,4));
  });
});
