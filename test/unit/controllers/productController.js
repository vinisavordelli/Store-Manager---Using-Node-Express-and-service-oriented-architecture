const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

const { mockedAllProducts, mockedProduct } = require('../mocks/productsMocks')

describe('Tests the product controller', () => {
  const res = {};
  const req = {params: {id: 0}};

  beforeEach(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    next = sinon.stub().returns();
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

    describe('should get products filter by id', () => {

      describe('when the id exists', () => {
  
        beforeEach(async () => {
          sinon.stub(productsService, 'findById').resolves(mockedProduct[0]);
        });
  
        afterEach(async () => {
          productsService.findById.restore();
        });
  
        it('with the status OK', async () => {
          await productsController.findById(req, res);
  
          expect(res.status.calledWith(200)).to.be.true;
        })
  
        it('with the correct data', async () => {
          await productsController.findById(req, res);
  
          expect(res.json.calledWith(mockedProduct[0])).to.be.true;
        })
  
      })
  
      describe('when passing a non existing id', () => {
  
        beforeEach(async () => {
          sinon.stub(productsService, 'findById').resolves({ error:
            { code: 'notFound',
              message: 'Product not found',
            } });
        });
  
        afterEach(async () => {
          productsService.findById.restore();
        });
  
        it('send a object with the error', async () => {
          await productsController.findById(req, res, next);
  
          expect(next.calledWith({ code: 'notFound', message: 'Product not found'})).to.be.true;
        })
      })
    })

  });
});