import Car from './car';
import Paper from 'paper';

describe('Car', function() {
  it('has no initial position', function() {
    // Act
    var car = new Car(1);

    // Assert
    expect(car.position).toBeNull();
  });

  it('has no initial direction', function() {
    // Act
    var car = new Car(1);

    // Assert
    expect(car.direction).toEqual(new Paper.Point(0, 0));
  });

  it('has no initial moves', function() {
    // Act
    var car = new Car(1);

    // Assert
    expect(car.moves).toEqual(0);
  });

  it('can set start position', function() {
    // Arrange
    var car = new Car(1);

    // Act
    car.setStartPosition(new Paper.Point(9, 8));

    // Assert
    expect(car.position).toEqual(new Paper.Point(9, 8));
  });

  it('has no moves after setting start position', function() {
    // Arrange
    var car = new Car(1);

    // Act
    car.setStartPosition(new Paper.Point(7, 3));

    // Assert
    expect(car.moves).toEqual(0);
  });

  it('has no direction after setting start position', function() {
    // Arrange
    var car = new Car(1);

    // Act
    car.setStartPosition(new Paper.Point(1, 8));

    // Assert
    expect(car.direction).toEqual(new Paper.Point(0, 0));
  });

  it('cannot set start position twice', function() {
    // Arrange
    var car = new Car(1);
    car.setStartPosition(new Paper.Point(5, 4));

    // Act and assert
    expect(function() { car.setStartPosition(new Paper.Point(7, 2)) }).toThrow();
  });

  it('cannot move without start position', function() {
    // Arrange
    var car = new Car(1);

    // Act and assert
    expect(function() { car.move(new Paper.Point(6, 5)) }).toThrow();
  });

  it('can move', function() {
    // Arrange
    var car = new Car(1);
    car.setStartPosition(new Paper.Point(1, 1));

    // Act
    car.move(new Paper.Point(3, 3));

    // Assert
    expect(car.position).toEqual(new Paper.Point(3, 3));
    expect(car.direction).toEqual(new Paper.Point(2, 2));
    expect(car.moves).toEqual(1);

    // Act
    car.move(new Paper.Point(4, 4));

    // Assert
    expect(car.position).toEqual(new Paper.Point(4, 4));
    expect(car.direction).toEqual(new Paper.Point(1, 1));
    expect(car.moves).toEqual(2);
  });

  it('calculates correct possible moves', function() {
    // Arrange
    var car = new Car(1);

    // Act
    var possibleMoves = car.getPossibleMoves();

    // Assert
    expect(possibleMoves.length).toEqual(9);
  });
});
