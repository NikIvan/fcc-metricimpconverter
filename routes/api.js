'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get((req, res) => {
      const {input} = req.query;
      const errors = {
        number: null,
        unit: null,
      };

      let initNum;
      let initUnit;

      try {
        initUnit = convertHandler.getUnit(input);
      } catch (err) {
        errors[err.message] = err.message;
      }

      try {
        const numInput = input.split(initUnit)[0];
        initNum = convertHandler.getNum(numInput);
      } catch (err) {
        errors[err.message] = err.message;
      }

      console.dir({
        initNum,
        initUnit,
      });

      if (errors.number != null || errors.unit != null) {
        if (errors.number && errors.unit) {
          return res.send(`invalid ${errors.number} and ${errors.unit}`);
        }

        const error = errors.number || errors.unit;
        return res.send(`invalid ${error}`);
      }

      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      return res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string,
      });
    });
};
