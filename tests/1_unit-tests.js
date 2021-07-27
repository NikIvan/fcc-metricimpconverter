const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Convert handler tests', () => {
  const validUnits = Object.keys(convertHandler.units);

  test('should correctly read a whole number input', () => {
    const input = '23km';
    const expected = 23;
    const actual = convertHandler.getNum(input);

    assert.strictEqual(actual, expected, input);
  });

  test('should correctly read a decimal number input', () => {
    const input = '23.2km';
    const expected = 23.2;
    const actual = convertHandler.getNum(input);

    assert.strictEqual(actual, expected, input);
  });

  test('should correctly read a fractional input', () => {
    const input = '2/3km';
    const expected = 2/3;
    const actual = convertHandler.getNum(input);

    assert.strictEqual(actual, expected, input);
  });

  test('should correctly read a fractional input with a decimal', () => {
    const input = '2.1/3.4km';
    const expected = 2.1/3.4;
    const actual = convertHandler.getNum(input);

    assert.strictEqual(actual, expected, input);
  });

  test('should correctly return an error on a double-fraction (i.e. 3/2/3)', () => {
    const input = '3/2/3km';

    expect(() => convertHandler.getNum(input)).to.throw(Error, 'number');
  });

  test('should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    const input = '';
    const expected = 1;
    const actual = convertHandler.getNum(input);

    assert.strictEqual(actual, expected, input);
  });

  test('should correctly read each valid input unit', () => {
    validUnits.every((input) => {
      expect(() => convertHandler.getUnit(input)).to.not.throw(Error, 'unit');
    });
  });

  test('should correctly return an error for an invalid input unit', () => {
    const invalidInputs = ['1al', '2.3al', '2/3e', '3/2', '3.4', '2'];

    invalidInputs.every((input) => {
      expect(() => convertHandler.getUnit(input)).to.throw(Error, 'unit');
    });
  });

  test('should return the correct return unit for each valid input unit', () => {
    validUnits.every((input) => {
      const actual = convertHandler.getReturnUnit(input);
      const expected = convertHandler.units[input].convertsTo;

      assert.strictEqual(actual, expected, input);
    });
  });

  test('should correctly return the spelled-out string unit for each valid input unit', () => {
    validUnits.every((input) => {
      const expected = convertHandler.units[input].spellOut;
      const actual = convertHandler.spellOutUnit(input);
      assert.strictEqual(actual, expected, input);
    });
  });

  test('should correctly convert gal to L', () => {
    const initNum = 5;
    const initUnit = 'gal';
    const actual = convertHandler.convert(initNum, initUnit);
    const expected = 18.92705;

    assert.strictEqual(actual, expected, `${initNum} ${initUnit}`);
  });

  test('should correctly convert L to gal', () => {
    const initNum = 5;
    const initUnit = 'L';
    const actual = convertHandler.convert(initNum, initUnit);
    const expected = 1.32086;

    assert.strictEqual(actual, expected, `${initNum} ${initUnit}`);
  });

  test('should correctly convert mi to km', () => {
    const initNum = 5;
    const initUnit = 'mi';
    const actual = convertHandler.convert(initNum, initUnit);
    const expected = 8.04670;

    assert.strictEqual(actual, expected, `${initNum} ${initUnit}`);
  });

  test('should correctly convert km to mi', () => {
    const initNum = 5;
    const initUnit = 'km';
    const actual = convertHandler.convert(initNum, initUnit);
    const expected = 3.10686;

    assert.strictEqual(actual, expected, `${initNum} ${initUnit}`);
  });

  test('should correctly convert lbs to kg', () => {
    const initNum = 5;
    const initUnit = 'lbs';
    const actual = convertHandler.convert(initNum, initUnit);
    const expected = 2.26796;

    assert.strictEqual(actual, expected, `${initNum} ${initUnit}`);
  });

  test('should correctly convert kg to lbs', () => {
    const initNum = 5;
    const initUnit = 'kg';
    const actual = convertHandler.convert(initNum, initUnit);
    const expected = 11.02312;

    assert.strictEqual(actual, expected, `${initNum} ${initUnit}`);
  });
});
