import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ExcerptPipe],
  exports: [ExcerptPipe],
})
export class SharedModule {}
