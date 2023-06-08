import {Action, createReducer, on} from "@ngrx/store";
import {ClientActions} from "src/store/actions/client.actions";
import {ClientGetDTO} from "../../app/models/client";

export interface State {
  loadingState: boolean,
  client: ClientGetDTO,
  errorMessage: any,
  hasJustSignedUp: boolean | null
}

const initialState: State = {
  loadingState: false,
  client: {} as ClientGetDTO,
  errorMessage: {},
  hasJustSignedUp: null
}


export const _clientReducer = createReducer(
  initialState,
  on(ClientActions.PostClientStart, (state) => {
    return {
      ...state,
      loadingState: true
    }
  }),
  on(ClientActions.PostClientSucceeded, (state, {clientGetDTO}) => {
    return {
      ...state,
      client: clientGetDTO,
      errorMessage: '',
      loadingState: false,
      hasJustSignedUp: true
    }
  }),
  on(ClientActions.PostClientFailed, (state, {error}) => {
    console.log(error, "lkcecinq")
    return {
      ...state,
      loadingState: false,
      errorMessage: error,
    }
  }),
  on(ClientActions.GetClientStart, (state) => {
    return {
      ...state,
      loadingState: true
    }
  }),
  on(ClientActions.GetClientSucceeded, (state, {clientGetDTO}) => {
    return {
      ...state,
      client: clientGetDTO,
      errorMessage: '',
      loadingState: false,
    }
  }),
  on(ClientActions.GetClientFailed, (state, {error}) => {
    return {
      ...state,
      loadingState: false,
      errorMessage: error,
    }
  }),
  on(ClientActions.Logout, (state) => {
    return {
      ...state,
      loadingState: false,
      client: {} as ClientGetDTO,
    }
  }),
)

export function clientReducer(state: State | undefined, action: Action) {
  return _clientReducer(state, action);
}
