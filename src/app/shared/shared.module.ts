import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbRatingModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// scroll package
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AccountBreadcrumbsComponent } from './account-breadcrumbs/account-breadcrumbs.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    AccountBreadcrumbsComponent,
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbRatingModule,
    NgbNavModule,
    ScrollToModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    AccountBreadcrumbsComponent,
    SidemenuComponent
  ]
})
export class SharedModule { }
