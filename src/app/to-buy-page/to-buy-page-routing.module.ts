import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToBuyPagePage } from './to-buy-page.page';

const routes: Routes = [
  {
    path: '',
    component: ToBuyPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToBuyPagePageRoutingModule {}
