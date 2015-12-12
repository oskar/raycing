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

  it('has no initial moves', function() {
    // Act
    var car = new Car(new Paper.Point(0, 0), new Paper.Point(0, 0));

    // Assert
    expect(car.moves).toEqual(0);
  });

  it('has correct number of moves', function() {
    // Arrange
    var car = new Car(new Paper.Point(0, 0), new Paper.Point(0, 0));

    // Act
    car.move(new Paper.Point(1, 1));

    // Assert
    expect(car.moves).toEqual(1);

    // Act
    car.move(new Paper.Point(2, 2));

    // Assert
    expect(car.moves).toEqual(2);
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
