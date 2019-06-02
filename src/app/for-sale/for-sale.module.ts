import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ForSaleComponent } from './for-sale.component';
import { RouterModule } from '@angular/router';
import { ItemForSaleComponent } from './item-for-sale/item-for-sale.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForSaleComponent,
      },
      {
        path: ':itemId',
        component: ItemForSaleComponent,
      },
    ]),
  ],
  declarations: [ForSaleComponent, ItemForSaleComponent],
})
export class ForSaleModule {}
