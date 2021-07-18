import { Action } from '@ngrx/store';
import * as auth from './auth.constants';

export class LoginStart implements Action {
  readonly type = auth.LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class SignupStart implements Action {
  readonly type = auth.SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = auth.AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class AuthenticateFail implements Action {
  readonly type = auth.AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class ClearError implements Action {
  readonly type = auth.CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = auth.AUTO_LOGIN;
}

export class Logout implements Action {
  readonly type = auth.LOGOUT;
}

export type AuthActions =
  | LoginStart
  | SignupStart
  | AuthenticateSuccess
  | AuthenticateFail
  | ClearError
  | AutoLogin
  | Logout;
