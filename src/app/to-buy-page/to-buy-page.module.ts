import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToBuyPagePageRoutingModule } from './to-buy-page-routing.module';

import { ToBuyPagePage } from './to-buy-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToBuyPagePageRoutingModule
  ],
  declarations: [ToBuyPagePage]
})
export class ToBuyPagePageModule {}
