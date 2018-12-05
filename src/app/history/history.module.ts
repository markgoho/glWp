import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './containers/history/history.component';

@NgModule({
  declarations: [HistoryComponent],
  imports: [CommonModule, HistoryRoutingModule],
})
export class HistoryModule {}
