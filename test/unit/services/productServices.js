const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

const { mockedAllProducts, mockedProduct } = require('../mocks/productsMocks')

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

  describe('Tests the product findByID', () => {

    describe('when passing and existing id', () => {

      beforeEach(async () => {
        sinon.stub(productsModel, 'findById').resolves(mockedProduct);
      });

      afterEach(async () => {
        productsModel.findById.restore();
      });

      it('it should return the proper product', async () => {
        const response = await productsModel.findById(2);

        expect(response).to.deep.equal(mockedProduct)
      })
    })
  });
  
  describe('when passing a non existing id', () => {


    beforeEach(async () => {
      sinon.stub(productsModel, 'findById').resolves(null);
    });

    afterEach(async () => {
      productsModel.findById.restore();
    });

    it('it should throw an error with this message', async () => {
      const response = await productsService.findById(5);

      expect(response).to.deep.equal({ error: { code: 'Not Found', message: 'Product not found' } })
    })
  })
})
