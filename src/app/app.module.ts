import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ToastrModule } from 'ngx-toastr';
import { LoginService } from './services/users/login.service';
import { UserService } from './services/users/user.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { StateService } from './services/states/state.service';
import { CityService } from './services/cities/city.service';
import { CategoryService } from './services/categories/category.service';
import { ProductService } from './services/products/product.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ProductResolver } from './services/products/product.resolver';
import { ProductByCategoryResolver } from './services/products/productByCategory.resolver';
import { CommentService } from './services/comments/comment.service';
import { CurrencyPipe } from '@angular/common';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  dropSpecialCharacters: false,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
    ToastrModule.forRoot(),    
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    provideNgxMask(),
    LoginService,
    UserService,
    StateService,
    CityService,
    CategoryService,
    ProductService,
    CommentService,
    ProductResolver,
    ProductByCategoryResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
