import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './containers/contact/contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ReactiveFormsModule, ContactRoutingModule],
})
export class ContactModule {}
