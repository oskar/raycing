var Car = require('./car');
var Paper = require('paper');

describe('Car', function() {
  it('has initial position', function() {
    // Act
    var car = new Car(new Paper.Point(1, 3), new Paper.Point(0, 0));

    // Assert
    expect(car.position).toEqual(new Paper.Point(1, 3));
  });

  it('has initial direction', function() {
    // Act
    var car = new Car(new Paper.Point(0, 0), new Paper.Point(3, 4));

    // Assert
    expect(car.direction).toEqual(new Paper.Point(3, 4));
  });

  it('can move', function() {
    // Arrange
    var car = new Car(new Paper.Point(1, 1), new Paper.Point(0, 0));

    // Act
    car.move(new Paper.Point(2, 2));

    // Assert
    expect(car.position).toEqual(new Paper.Point(3, 3));
    expect(car.direction).toEqual(new Paper.Point(2, 2));
  });
});
