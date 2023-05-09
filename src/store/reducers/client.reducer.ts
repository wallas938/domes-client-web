import { Action, createReducer, on } from "@ngrx/store";
import { ClientActions } from "src/store/actions/client.actions";
import {ClientGetDTO} from "../../app/models/client";

export interface State {
  loadingState: boolean,
  client : ClientGetDTO | null | undefined
}

const initialState: State = {
  loadingState: false,
  client: null
}


export const _clientReducer = createReducer(
  initialState,
  on(ClientActions.PostClientStart, (state) => {
    return {
      ...state,
      loadingState: true
    }
  }),
  on(ClientActions.PostClientSucceeded, (state) => {
    return {
      ...state,
      loadingState: false
    }
  }),
  on(ClientActions.PostClientFailed, (state) => {
    return {
      ...state,
      loadingState: false
    }
  }),
)

export function clientReducer(state: State | undefined, action: Action) {
  return _clientReducer(state, action);
}
