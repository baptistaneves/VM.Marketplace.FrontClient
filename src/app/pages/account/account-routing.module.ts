import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
import { SettingComponent } from './setting/setting.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path: 'setting', component: SettingComponent
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
