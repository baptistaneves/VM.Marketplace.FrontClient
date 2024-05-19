import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { IndexComponent } from './home/index/index.component';
import { SingleComponent } from './single/single.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent
  },
  {
    path: 'single', component: SingleComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'category', component: CategoryComponent
  },
  {
    path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'sellerdashboard', loadChildren: () => import('./sellerdashboard/sellerdashboard.module').then(m => m.SellerdashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
