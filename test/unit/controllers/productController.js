const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

const { mockedAllProducts } = require('../mocks/productsMocks')

describe('Tests the product controller', () => {
  const res = {};
  const req = {};

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  })
  describe('When calling the getAll function', () => {

    beforeEach(async () => {
      sinon.stub(productsService, 'getAll').resolves(mockedAllProducts);
    });

    afterEach(async () => {
      productsService.getAll.restore();
    });

    it('it returns all products', async () => {
      await productsController.getAll(req, res);

      expect(res.json.calledWith(mockedAllProducts)).to.be.true;
    })

  });
});