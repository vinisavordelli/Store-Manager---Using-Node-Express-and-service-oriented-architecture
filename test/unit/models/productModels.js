const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

const { mockedAllProducts, mockedProduct } = require('../mocks/productsMocks')

describe('Tests the product Model', () => {

  describe('When calling the getAll function', () => {

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(mockedAllProducts);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('it returns all products', async () => {
      const response = await productsModel.getAll();

      expect(response).to.deep.equal(mockedAllProducts[0])
    })

  });

  describe('Tests the product findByID', () => {

    describe('when passing an existing id', () => {

      beforeEach(async () => {
        sinon.stub(connection, 'execute').resolves([mockedProduct]);
      });

      afterEach(async () => {
        connection.execute.restore();
      });

      it('it should return the proper product', async () => {
        const response = await productsModel.findById(2);

        expect(response).to.deep.equal(mockedProduct[0])
      })
    })
    
  });
});