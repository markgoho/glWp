import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// From https://goo.gl/KSAhHi
@Injectable()
export class ActivatedRouteStub {
  // ActivatedRoute.params is Observable
  private subject = new BehaviorSubject<any>(this.testParams);
  params = this.subject.asObservable();

  // Test parameters
  private _testParams: {};
  get testParams() {
    return this._testParams;
  }

  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }

  // ActivatedRoute.snapshot.params
  get snapshot() {
    return { params: this.testParams };
  }
}
