import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Title } from '@angular/platform-browser';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map, switchMap, tap, catchError } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { firestore } from 'firebase/app';

interface VerificationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  score?: number;
  action?: string;
  'error-codes'?: string[];
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  messageSending = false;
  messageSent = false;
  formSubmitted = false;
  sendingResult: string;

  verificationSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private titleService: Title,
    private recaptcha: ReCaptchaV3Service,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
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

  // async submitForm(): Promise<void> {
  //   if (this.contactForm.valid) {
  //     const { value } = this.contactForm;
  //     this.messageSending = true;

  //     const token = await this.recaptcha.execute('contact').toPromise();
  //     const verification: VerificationResponse = await this.http
  //       .get<VerificationResponse>(
  //         `https://us-central1-gideonlabs-b4b71.cloudfunctions.net/verifyRecaptcha?token=${token}`
  //       )
  //       .toPromise();

  //     this.messageError = verification.success;

  //     if (verification.score && verification.score > 0.9) {
  //       await this.afs.collection('messages').add(value);
  //       this.messageSending = false;
  //       this.messageSent = true;
  //     } else {
  //       this.messageSent = false;
  //       this.messageSending = false;
  //     }

  //     this.contactForm.reset();
  // }

  submitForm(): void {
    if (this.contactForm.valid) {
      this.formSubmitted = true;
      this.messageSending = true;
      const { value } = this.contactForm;
      const contactFormMessage = {
        ...value,
        submitted: firestore.Timestamp.fromDate(new Date()),
      };

      // if (messageSuccess) {
      //   this.messageSending = false;
      // } else {
      //   this.messageSending = false;
      // }
      this.verificationSub = this.getVerification()
        .pipe(
          switchMap(verification => {
            const messageSuccess = verification.success && verification.score > 0.6;
            this.sendingResult = messageSuccess
              ? 'Your message has been sent. Please allow some time to review the request.'
              : 'We are unable to send the request form at this time. Please consider calling our lab directly.';

            if (messageSuccess) {
              this.messageSending = false;
              return this.sendFormData(contactFormMessage);
            } else {
              this.messageSending = false;
              return of('No way buddy');
            }
          }),
          catchError(() => of(null))
        )
        .subscribe();
    }
  }

  getVerification(): Observable<VerificationResponse> {
    return this.recaptcha.execute('contact').pipe(
      switchMap(token =>
        this.http.get<VerificationResponse>(
          `https://us-central1-gideonlabs-b4b71.cloudfunctions.net/verifyRecaptcha?token=${token}`
        )
      ),
      catchError(() => of(null))
    );
  }

  async sendFormData(value: any) {
    return this.afs.collection('messages').add(value);
  }

  ngOnDestroy(): void {
    this.verificationSub.unsubscribe();
  }
}
