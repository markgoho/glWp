import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export enum RouterActionTypes {
  GO = '[ROUTER] Go',
  BACK = '[ROUTER] Back',
  FORWARD = '[ROUTER] Forward',
}

export class Go implements Action {
  readonly type = RouterActionTypes.GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  readonly type = RouterActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.FORWARD;
}

export type RouterActions = Go | Back | Forward;
