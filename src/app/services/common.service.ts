import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as data from '../datasource/datasource.json';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  _apiUrl:string = environment.apiUrl;
  PRODUCTS:any;

  constructor(private http:HttpClient) { }

  public loadProducts(loadLocal:boolean):Promise<any>{
    return loadLocal?this.setProductsLocal(data):new Promise((resolve,reject) => {
      this.http.get(`${this._apiUrl}getproducts`).subscribe({
        next:(res)=>{this.setProducts(res)},
        error:()=>{reject("Failed to load projects")},
        complete:()=>{resolve("Projects loaded successfully")}
      })
    })
  }

  private setProducts(data:any){
    this.PRODUCTS=data;
  }

  //this method is just for the sake of this task as in real application, the data will be fetched from backend
  private setProductsLocal(data:any):Promise<any>{
    this.PRODUCTS=data.default;
    return Promise.resolve();
  }

  public getProducts(){
    return this.PRODUCTS;
  }

  public placeOrder(body:any){
    return this.http.post(`${this._apiUrl}placeorder`,body);
  }
}
