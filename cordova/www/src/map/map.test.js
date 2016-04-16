import Map from './map';

describe('Car', () => {
  it('can be created', () => {
    // Act
    var map = new Map(10);

    // Assert
    expect(map.positions.length).toEqual(100);
  });

  it('can add a circle', () => {
    // Arrange
    var map = new Map(10);

    // Act
    map.addCircle([5,5], 1);

    // Assert
    expect(map.positions[55].exists).toEqual(true);
  })
});
