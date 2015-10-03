var Car = require('./car');

describe("A Car", function() {
  it("can honk", function() {
    var car = new Car('beep!');
    expect(car.honk()).toEqual('beep!');
  });
});
