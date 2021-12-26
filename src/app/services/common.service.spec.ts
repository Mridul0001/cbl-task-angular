import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonServiceMock } from '../testing/mocks/common.service.mock';
import { PRODUCTS_MOCK } from '../testing/mockdata/products.mock';
import { _API } from '../testing/mockdata/testvalues';
import * as data from '../datasource/datasource.json';

describe('CommonService', () => {
  let service: CommonService;
  let httpTestingController:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CommonService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service._apiUrl = _API;
    service.PRODUCTS = PRODUCTS_MOCK;
  });

  afterEach(()=>{
    httpTestingController.verify()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products from api when loadProducts() is called with local mode false', () => {
    service.loadProducts(false);
    const req = httpTestingController.expectOne(`${_API}getprojects`);
    expect(req.request.method).toEqual('GET');
    req.flush({})
  });

  it('should load products from api when loadProducts() is called with local mode true', () => {
    service.loadProducts(true);
    let d = data as any;
    expect(service.PRODUCTS).toEqual(d.default)
  });

  it('should return all products when getProducts() is called', ()=>{
    spyOn(service,'getProducts').and.callThrough();
    const products_mock = service.getProducts();
    expect(service.getProducts).toHaveBeenCalled();
    expect(products_mock).toEqual(PRODUCTS_MOCK);
  });
  
  it('should call placeorder endpoint', ()=>{
    service.placeOrder({}).subscribe({
      next:(data)=>{expect(data).toEqual({"orderId":1})}
    });
    const req = httpTestingController.expectOne(`${_API}placeorder`);
    expect(req.request.method).toEqual('POST');
    req.flush({"orderId":1});
  })
});
