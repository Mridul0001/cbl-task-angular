import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CommonService } from './services/common.service';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//This function will be used for any kind of initial loading before app starts
export function loadInitialConfig(commonService: CommonService, http: HttpClient){
  /**
   * Loading products for now as the app doesn't have any kind of user mechanism. 
   * Just for the sake of this project. Ideally it should be any kind of important config
   */

  //Set this to true if you wish to load products from local datasource file
  let loadFromLocal = false;

  return () =>  commonService.loadProducts(loadFromLocal);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CommonService,
    {
      provide:APP_INITIALIZER,
      useFactory:loadInitialConfig,
      deps:[CommonService,HttpClient],
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
