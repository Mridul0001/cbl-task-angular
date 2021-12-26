import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { COLORMAP, SIZES } from '../mapping/mappings';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  //Using 'any' type for dynamic data, although we can be specific if we know the fields beforehand
  @Input("isSeller") isSeller = '';
  PRODUCTS:any;
  COLORMAP:any = COLORMAP;
  SIZES:any = SIZES;
  isLoading:boolean=false;
  builtProducts:any;
  defaultProductColor:string = "#b6beb6";
  disableSubmitButton:boolean = false;
  subscription:Subscription[] = [];
  //Error messages could be configured specifcally as per the error, but doing this now for simplicity
  weightErrorMessage:string = "*Enter weight between 1 - 1000";
  qtyErrorMessage:string = "*Enter quantity between 1-5";
  genericErrorMessage:string = "*Please select a value"
  constructor(private service:CommonService, private formBuilder:FormBuilder) { }

  productsForm = this.formBuilder.group({
    //other controls if want to add
    products: this.formBuilder.array([])
  });

  ngOnInit(): void {
    this.PRODUCTS=this.service.getProducts();
    this.buildFormArray();
  }

  ngOnDestroy(): void {
      //will be used to perform any cleanup like unsubscribing observables (if any)
      this.subscription.forEach((s)=>{s.unsubscribe()})
  }

  buildFormArray(){
    this.PRODUCTS.map((p:any)=>{
      const productForm = this.formBuilder.group({
        productId: [p.id],
        size:['',Validators.required],
        color:['',Validators.required],
        weight:['',[Validators.required,Validators.min(1),Validators.max(1000)]],
        qty:['',[Validators.required,Validators.min(1),Validators.max(5)]]
      });

      this.products.push(productForm);
    })

    this.builtProducts=this.products;
    console.log(this.builtProducts)
  }

  get products(){
    return this.productsForm.controls["products"] as FormArray;
  }

  productSelection(i:number){
    if(this.builtProducts.controls[i].disabled){
      this.builtProducts.controls[i].enable();
    }else{
      this.builtProducts.controls[i].disable();
    }
    this.disableSubmitButton=this.builtProducts.disabled;
  }

  handleSubmit(){
    this.isLoading=this.productsForm.valid;
    console.log(this.productsForm);
    if(this.isLoading){
      //Add subscription to subscriptions array so that it can be unscubsribed on component destruction
      this.subscription.push(this.service.placeOrder({order:this.productsForm.value.products}).subscribe({
        next:(res:any)=>{
          this.isLoading=false;
          alert("Order placed successfully, check the new opened tab to confirm it is saved in database")
          window.open(`https://promasy-api.herokuapp.com/v1/getorder/${res.id}`,"_blank")
          this.doReload();
        },
        error:(err)=>{
          alert("Something went wrong, can not place order. Page will be refreshed now");
          console.error(err);
          this.doReload();
        }
      }));
    }
  }

  deleteProduct(i:number){
    /*
     * Could add alert here to confirm deletion, but as it is just to specifically 
     * show removeAt() method so keeping it simple for now.
     * */

    this.builtProducts.removeAt(i);
    this.disableSubmitButton=this.builtProducts.length==0;
  }

  //passing window reload function to variable to avoid infinite reload in testing
  doReload = function(){
    window.location.reload();
  }

}
