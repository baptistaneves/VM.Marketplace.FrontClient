import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { SalesComponent } from './sales/sales.component';
import { ProductComponent } from './product/product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { PayoutComponent } from './payout/payout.component';
import { VendorComponent } from './vendor/vendor.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { ProductResolver } from 'src/app/services/products/product.resolver';

const routes: Routes = [
  {
    path: 'sales', component: SalesComponent
  },
  {
    path: 'produtos', component: ProductComponent
  },
  {
    path: 'addproduct', component: AddproductComponent
  },
  {
    path: 'editar-produto/:id',
    component: EditproductComponent,
    resolve: {
      product: ProductResolver
    }
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
