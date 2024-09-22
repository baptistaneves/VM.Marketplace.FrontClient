import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//routing
import { SallerdashboardRoutingModule } from './sellerdashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Apex Chart
import { NgApexchartsModule } from 'ng-apexcharts';

// Drop Zone
import { NgxDropzoneModule } from 'ngx-dropzone';

// Content
import { SalesComponent } from './sales/sales.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { PayoutComponent } from './payout/payout.component';
import { VendorComponent } from './vendor/vendor.component';
import { RouterModule } from '@angular/router';
import { EditproductComponent } from './editproduct/editproduct.component';
import { NgxEditorModule } from 'ngx-editor';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';


@NgModule({
  declarations: [
    SalesComponent,
    ProductComponent,
    AddproductComponent,
    EditproductComponent,
    PayoutComponent,
    VendorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbTooltipModule,
    NgbCollapseModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SallerdashboardRoutingModule,
    SharedModule,
    NgApexchartsModule,
    NgxDropzoneModule,
    NgxEditorModule,
    NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class SellerdashboardModule { }
