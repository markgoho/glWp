import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  messageSuccess = false;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.titleService.setTitle('Contact Us');
  }

  createForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
    });
  }

  async submitForm(): Promise<void> {
    if (this.contactForm.valid) {
      const { value } = this.contactForm;
      await this.afs.collection('messages').add(value);

      this.contactForm.reset();
      this.messageSuccess = true;
    }
  }
}
