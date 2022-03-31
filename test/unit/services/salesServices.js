
const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesService = require('../../../models/salesService');
const mockedAllSales = require('../../mocks/salesMocks');

describe('Sales Model Tests', () => {
    describe('Tests the getAll method and what it should return when called correctly', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([mockedAllSales]);
      });

      after(() => {
        connection.execute.restore();
      });

      it('Check if an array is returned' , async () => {
        const products = await salesService.getAll();

        expect(products).to.be.a('array')
      });

      it('Checks the length of the array' , async () => {
        const products = await salesService.getAll();

        expect(products).to.have.length(2)
        expect(products).to.be.equal(mockedAllSales)
      });
  })
})