import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule, NgbRatingModule, NgbTooltipModule, } from '@ng-bootstrap/ng-bootstrap';

//routing
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Component
import { SettingComponent } from './setting/setting.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { FavoritesComponent } from './favorites/favorites.component';

@NgModule({
  declarations: [
    SettingComponent,
    PurchaseComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    NgbRatingModule,
    NgbTooltipModule,
    AccountRoutingModule,
    SharedModule,
  ]
})
export class AccountModule { }