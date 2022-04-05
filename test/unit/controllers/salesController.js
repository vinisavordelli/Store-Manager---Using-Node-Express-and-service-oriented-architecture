const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

const {allSales, detailedSales} = require('../mocks/salesMocks')

describe('Tests the sale Model', () => {
  const res = {};
  const req = {};

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    res.end = sinon.stub().returns();
    next = sinon.stub().returns()
  })

  describe('When calling the getAll function', () => {

    beforeEach(async () => {
      sinon.stub(salesService, 'getAll').resolves(detailedSales[0]);
    })

    afterEach(async () => {
      salesService.getAll.restore();
    })

    it('it returns all products', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(detailedSales[0])).to.be.true;
    })


  });

});