import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { CommonServiceMock } from '../testing/mocks/common.service.mock';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { PRODUCTS_MOCK } from '../testing/mockdata/products.mock';
import { throwError } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let commonService: CommonService;
  let originalErrorFunction:any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,ReactiveFormsModule,MaterialModule,BrowserAnimationsModule],
      declarations: [ HomeComponent ],
      providers: [{provide:CommonService, useClass:CommonServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    commonService = fixture.debugElement.injector.get(CommonService);
    component.doReload = function(){}
    originalErrorFunction = console.error;
    console.error = jasmine.createSpy("error");
  });

  afterEach(()=>{
    component.PRODUCTS = PRODUCTS_MOCK;
    console.error=originalErrorFunction;
    originalErrorFunction=null;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select product on slide button change', ()=>{
    component.isSeller="buyer";
    fixture.detectChanges();
    spyOn(component, 'productSelection').and.callThrough();
    let heroDe = fixture.debugElement.query(By.css('.product-action-button'));
    heroDe.triggerEventHandler('change',0);
    expect(component.productSelection).toHaveBeenCalled();
  });

  it('should disable or enable fields on selection change', ()=>{
    component.isSeller="buyer";
    fixture.detectChanges();
    spyOn(component, 'productSelection').and.callThrough();
    let heroDe = fixture.debugElement.query(By.css('.product-action-button'));
    heroDe.triggerEventHandler('change',0);
    expect(component.builtProducts.controls[0].disabled).toBeTruthy();
    heroDe.triggerEventHandler('change',0);
    expect(component.builtProducts.controls[0].disabled).toBeFalsy();
  });

  it('should delete product from list if in seller context', ()=>{
    component.isSeller="seller";
    fixture.detectChanges();
    spyOn(component, 'deleteProduct').and.callThrough();
    let heroDe = fixture.debugElement.query(By.css('.product-action-button'));
    heroDe.triggerEventHandler('click',0);
    expect(component.deleteProduct).toHaveBeenCalled();
    expect(component.builtProducts.length).toEqual(0);
  });

  it('should handle order placement', ()=>{
    component.isSeller="buyer";
    component.builtProducts.controls[0].controls['size'].setValue('M');
    component.builtProducts.controls[0].controls['weight'].setValue('10');
    component.builtProducts.controls[0].controls['color'].setValue('#FFDA22');
    component.builtProducts.controls[0].controls['qty'].setValue('5');
    fixture.detectChanges();
    spyOn(component, 'handleSubmit').and.callThrough();
    let heroDe = fixture.debugElement.query(By.css('#product-selection-form'));
    heroDe.triggerEventHandler('submit',null);
    expect(component.handleSubmit).toHaveBeenCalled();
  });

  it('should call placeOrder method of CommonService and receive orderId', ()=>{
    component.isSeller="buyer";
    component.builtProducts.controls[0].controls['size'].setValue('M');
    component.builtProducts.controls[0].controls['weight'].setValue('10');
    component.builtProducts.controls[0].controls['color'].setValue('#FFDA22');
    component.builtProducts.controls[0].controls['qty'].setValue('5');
    fixture.detectChanges();
    spyOn(commonService, 'placeOrder').and.callThrough();
    let heroDe = fixture.debugElement.query(By.css('#product-selection-form'));
    heroDe.triggerEventHandler('submit',null);
    expect(commonService.placeOrder).toHaveBeenCalled();
  });

  it('should call handle error if placeOrder returns with error', ()=>{
    component.isSeller="buyer";
    component.builtProducts.controls[0].controls['size'].setValue('M');
    component.builtProducts.controls[0].controls['weight'].setValue('10');
    component.builtProducts.controls[0].controls['color'].setValue('#FFDA22');
    component.builtProducts.controls[0].controls['qty'].setValue('5');
    fixture.detectChanges();
    spyOn(commonService, 'placeOrder').and.returnValue(throwError(()=>new Error("error")));
    let heroDe = fixture.debugElement.query(By.css('#product-selection-form'));
    heroDe.triggerEventHandler('submit',null);
    expect(console.error).toHaveBeenCalled();
  });
});
