const sinon = require('sinon');
const { expect } = require('chai');
const mockedAllProducts = require('../../mocks/productsMocks');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Products Model Tests', () => {
    describe('Tests the getAll method and what it should return when called correctly', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([mockedAllProducts])
      });

      after(() => {
        connection.execute.restore();
      });

      it('Check if an array is returned' , async () => {
        const products = await productsModel.getAll();

        expect(products).to.be.a('array')
      });

      it('Checks the length of the array' , async () => {
        const products = await productsModel.getAll();

        expect(products).to.have.length(3)
        expect(products).to.be.equal(mockedAllProducts)
      });
    })})