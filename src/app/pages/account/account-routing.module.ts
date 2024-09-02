import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { SettingComponent } from './setting/setting.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AccountGuard } from 'src/app/guards/account.guard';

const routes: Routes = [
  {
    path: 'minha-conta', component: SettingComponent, canActivate: [AccountGuard],
  },
  {
    path: 'purchase', component: PurchaseComponent
  },
  {
    path: 'favorites', component: FavoritesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
