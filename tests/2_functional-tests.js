const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Convert a valid input such as 10L', (done) => {
    const input = '10L';

    chai
      .request(server)
      .get(`/api/convert?input=${input}`)
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, 'application/json');
        assert.strictEqual(res.body.initNum, 10);
        assert.strictEqual(res.body.initUnit, 'L');
        assert.strictEqual(res.body.returnNum, 2.64172);
        assert.strictEqual(res.body.returnUnit, 'gal');
        assert.strictEqual(res.body.string, '10 liters converts to 2.64172 gallons');

        done();
      });
  });

  test('Convert an invalid input such as 32g', (done) => {
    const input = '32g';

    chai
      .request(server)
      .get(`/api/convert?input=${input}`)
      .end((err, res) => {
        assert.strictEqual(res.status, 200, input);
        assert.strictEqual(res.text, 'invalid unit', input);
        done();
      });
  });

  test('Convert an invalid number such as 3/7.2/4kg', (done) => {
    const input = '3/7.2/4kg';

    chai
      .request(server)
      .get(`/api/convert?input=${input}`)
      .end((err, res) => {
        assert.strictEqual(res.status, 200, input);
        assert.strictEqual(res.text, 'invalid number', input);
        done();
      });
  });

  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', (done) => {
    const input = '3/7.2/4kilomegagram';

    chai
      .request(server)
      .get(`/api/convert?input=${input}`)
      .end((err, res) => {
        assert.strictEqual(res.status, 200, input);
        assert.strictEqual(res.text, 'invalid number and unit', input);
        done();
      });
  });

  test('Convert with no number such as kg', (done) => {
    const input = 'kg';

    chai
      .request(server)
      .get(`/api/convert?input=${input}`)
      .end((err, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, 'application/json');
        assert.strictEqual(res.body.initNum, 1);
        assert.strictEqual(res.body.initUnit, 'kg');
        assert.strictEqual(res.body.returnNum, 2.20462);
        assert.strictEqual(res.body.returnUnit, 'lbs');
        assert.strictEqual(res.body.string, '1 kilograms converts to 2.20462 pounds');

        done();
      });
  });
});
