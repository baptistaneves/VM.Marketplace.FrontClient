import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule, NgbRatingModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Component
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbTooltipModule,
    NgbRatingModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    SharedModule,
  ]
})
export class HomeModule { }
