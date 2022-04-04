const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

const { mockedAllProducts } = require('../mocks/productsMocks')

describe('Tests the product service', () => {

  describe('When calling the getAll function', () => {

    beforeEach(async () => {
      sinon.stub(productsModel, 'getAll').resolves(mockedAllProducts);
    });

    afterEach(async () => {
      productsModel.getAll.restore();
    });

    it('it returns all products', async () => {
      const response = await productsService.getAll();

      expect(response).to.deep.equal(mockedAllProducts)
    })

  });
});