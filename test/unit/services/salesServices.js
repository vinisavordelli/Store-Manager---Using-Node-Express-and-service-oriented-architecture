const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

const {allSales, detailedSales} = require('../mocks/salesMocks')

describe('Tests the sale Model', () => {

  describe('When calling the getAll function', () => {

    beforeEach(async () => {
      sinon.stub(salesModel, 'getAll').resolves(detailedSales[0]);
    })

    afterEach(async () => {
      salesModel.getAll.restore();
    })

    it('it returns all products', async () => {
      const response = await salesService.getAll();
      //no ite
      expect(response).to.deep.equal(detailedSales[0])
    })


  });

});