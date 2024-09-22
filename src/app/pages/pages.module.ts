import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbRatingModule, NgbAccordionModule, NgbDropdownModule, NgbPaginationModule, NgbTooltipModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

// Swiper Slider
import { SingleComponent } from './single/single.component';
import { CartComponent } from './cart/cart.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
// Light Box
import { LightboxModule } from 'ngx-lightbox';
import { CheckoutComponent } from './checkout/checkout.component';


import { CategoryComponent } from './category/category.component';


// page routing
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AccountModule } from './account/account.module';
import { SellerdashboardModule } from './sellerdashboard/sellerdashboard.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    SingleComponent,
    CartComponent,
    CheckoutComponent,
    CategoryComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbRatingModule,
    PagesRoutingModule,
    SharedModule,
    LightboxModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbPaginationModule,
    AccountModule,
    SellerdashboardModule,
    NgbTooltipModule,
    SlickCarouselModule,
    NgbAlertModule,
    NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class PagesModule { }
