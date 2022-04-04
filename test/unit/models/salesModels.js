const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

const {allSales, detailedSales} = require('../mocks/salesMocks')

describe('Tests the sale Model', () => {

  describe('When calling the getAll function', () => {

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(allSales);
    })

    afterEach(async () => {
      connection.execute.restore();
    })

    it('it returns all products', async () => {
      const response = await salesModel.getAll();
      //no ite
      expect(response).to.deep.equal(detailedSales[0])
    })


  });

});