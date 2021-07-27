function ConvertHandler() {
  this.units = {
    gal: {
      convertsTo: 'L',
      spellOut: 'gallons',
      ratio: 3.78541,
      unit: 'gal',
    },
    L: {
      convertsTo: 'gal',
      spellOut: 'liters',
      ratio: 1/3.78541,
      unit: 'L',
    },
    mi: {
      convertsTo: 'km',
      spellOut: 'miles',
      ratio: 1.60934,
      unit: 'mi',
    },
    km: {
      convertsTo: 'mi',
      spellOut: 'kilometers',
      ratio: 1/1.60934,
      unit: 'km',
    },
    lbs: {
      convertsTo: 'kg',
      spellOut: 'pounds',
      ratio: 0.453592,
      unit: 'lbs',
    },
    kg: {
      convertsTo: 'lbs',
      spellOut: 'kilograms',
      ratio: 1/0.453592,
      unit: 'kg',
    },
  };

  const unitRegex = /[a-zA-Z]+$/;
  const numRegex = /^[\d.\/]*/;

  this.getNum = function(input) {
    let result;
    let inputNumString = '';

    if (input === '') {
      inputNumString = '1';
    } else {
      inputNumString = input.match(numRegex)[0];
    }

    if (inputNumString === '') {
      throw new Error('number');
    }

    const fractions = inputNumString
      .split('/');

    switch (fractions.length) {
      case 1: {
        result = +fractions[0];
        break;
      }
      case 2: {
        result = +fractions[0] / +fractions[1];
        break;
      }
      default: {
        throw new Error('number');
      }
    }

    if (Number.isNaN(result) || !Number.isFinite(result)) {
      throw new Error('number');
    }

    return result;
  };
  
  this.getUnit = function(input) {
    const result = input.match(unitRegex)[0];
    const isValid = this.units[result] != null;

    if (!isValid) {
      throw new Error('unit');
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    return this.units[initUnit].convertsTo;
  };

  this.spellOutUnit = function(unit) {
    return this.units[unit].spellOut;
  };
  
  this.convert = function(initNum, initUnit) {
    return +(initNum * this.units[initUnit].ratio).toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
