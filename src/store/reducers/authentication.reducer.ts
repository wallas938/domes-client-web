import {Action, createReducer, on} from "@ngrx/store";
import {AuthenticationActions} from "src/store/actions/authentication.actions";
import {AuthenticationTokenResponse} from "../../app/models/authentication";

export interface State {
  loadingState: boolean,
  authenticationToken: AuthenticationTokenResponse | null,
  firstConnection: boolean | null,
  error: any
}

const initialState: State = {
  loadingState: false,
  authenticationToken: null,
  firstConnection: null,
  error: null
}


export const _authenticationReducer = createReducer(
  initialState,
  on(AuthenticationActions.GetAuthenticationTokenFromSignupStart, (state, {clientPostDTO}) => {
    return {
      ...state,
      loadingState: true,
    }
  }),
  on(AuthenticationActions.GetAuthenticationTokenFromSignupSucceeded, (state, {authenticationTokenResponse}) => {
    return {
      ...state,
      loadingState: false,
      authenticationToken: authenticationTokenResponse,
      firstConnection: false
    }
  }),
  on(AuthenticationActions.GetAuthenticationTokenFromSignupFailed, (state, {error}) => {
    return {
      ...state,
      loadingState: false,
      error: error,
      firstConnection: true
    }
  }),
  on(AuthenticationActions.GetAuthenticationTokenFromLoginStart, (state, {credentials}) => {
    return {
      ...state,
      loadingState: true
    }
  }),
  on(AuthenticationActions.GetAuthenticationTokenFromLoginSucceeded, (state, {authenticationTokenResponse}) => {
    return {
      ...state,
      loadingState: false,
      authenticationToken: authenticationTokenResponse,
      firstConnection: false
    }
  }),
  on(AuthenticationActions.GetAuthenticationTokenFromLoginFailed, (state, {error}) => {
    return {
      ...state,
      loadingState: false,
      error: error,
      firstConnection: true
    }
  }),
  on(AuthenticationActions.LogoutClientStart, (state) => {
    return {
      ...state,
      loadingState: true,
    }
  }),
  on(AuthenticationActions.LogoutClientSucceeded, (state) => {
    return {
      ...state,
      loadingState: true,
      authenticationToken: null,
      error: null,
      firstConnection: true
    }
  }),
  on(AuthenticationActions.ResetFirstConnection, (state) => {
    return {
      ...state,
      loadingState: false,
      authenticationToken: null,
      error: null,
      firstConnection: null
    }
  })
)

export function authenticationReducer(state: State | undefined, action: Action) {
  return _authenticationReducer(state, action);
}
