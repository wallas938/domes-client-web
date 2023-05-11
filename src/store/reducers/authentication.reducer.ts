import { Action, createReducer, on } from "@ngrx/store";
import { AuthenticationActions } from "src/store/actions/authentication.actions";
import {AuthenticationTokenResponse} from "../../app/models/authentication";

export interface State {
  loadingState: boolean,
  authenticationToken: AuthenticationTokenResponse | null
}

const initialState: State = {
  loadingState: false,
  authenticationToken: null
}


export const _authenticationReducer = createReducer(
  initialState,
  on(AuthenticationActions.GetAuthenticationTokenFromSignupStart, (state, {clientPostDTO}) => {
    return {
      ...state,
      loadingState: true
    }
  }),
  on(AuthenticationActions.GetAuthenticationTokenFromSignupSucceeded, (state, {authenticationTokenResponse}) => {
    return {
      ...state,
      loadingState: false,
      authenticationToken: authenticationTokenResponse
    }
  }),
  on(AuthenticationActions.GetAuthenticationTokenFromSignupFailed, (state, {error}) => {
    return {
      ...state,
      loadingState: false,
      errorMessage: error,
    }
  }),
)

export function authenticationReducer(state: State | undefined, action: Action) {
  return _authenticationReducer(state, action);
}
