const assert = require('assert');
const {forEach} = require('../index');

let numbers;
beforeEach(() => {
    numbers = [1,2,3];
});

it('sum an array (copy)', () => {
    let total = 0;
    forEach(numbers, value => total += value);
    
    let expected = 0;
    numbers.forEach(x => expected += x);

    assert.strictEqual(total, expected);
    numbers.push(4);
});

it('beforeEach test (copy)', () => {
    assert.deepStrictEqual(numbers, [1,2,3]);
})