import { User } from '../user.model';
import * as auth from './auth.constants';
import { AuthActions } from './auth.actions';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function reducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case auth.LOGIN_START:
    case auth.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case auth.AUTHENTICATE_SUCCESS:
      const { email, userId, token, expirationDate } = action.payload;
      const user = new User(email, userId, token, expirationDate);

      return {
        ...state,
        authError: null,
        loading: false,
        user: user,
      };
    case auth.AUTHENTICATE_FAIL:
      return {
        ...state,
        authError: action.payload,
        loading: false,
        user: null,
      };
    case auth.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    case auth.LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}
