import {Action, createReducer, on} from "@ngrx/store";
import {ClientActions} from "src/store/actions/client.actions";
import {ClientGetDTO} from "../../app/models/client";

export interface State {
  loadingState: boolean,
  client: ClientGetDTO,
  errorMessage: any,
}

const initialState: State = {
  loadingState: false,
  client: {} as ClientGetDTO,
  errorMessage: '',
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
    }
  }),
  on(ClientActions.PostClientFailed, (state, {error}) => {
    return {
      ...state,
      loadingState: false,
      errorMessage: error,
    }
  }),
)

export function clientReducer(state: State | undefined, action: Action) {
  return _clientReducer(state, action);
}
