import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollOffset: [0, 50] })],
  exports: [RouterModule]
})
export class AppRoutingModule { }