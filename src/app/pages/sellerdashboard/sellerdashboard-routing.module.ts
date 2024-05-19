import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { SalesComponent } from './sales/sales.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { PayoutComponent } from './payout/payout.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
  {
    path: 'sales', component: SalesComponent
  },
  {
    path: 'product', component: ProductComponent
  },
  {
    path: 'addproduct', component: AddproductComponent
  },
  {
    path: 'payout', component: PayoutComponent
  },
  {
    path: 'vendor', component: VendorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SallerdashboardRoutingModule { }
