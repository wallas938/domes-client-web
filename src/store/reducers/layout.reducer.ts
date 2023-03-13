import { Action, createReducer, on } from "@ngrx/store";
import { LayoutActions } from "src/store/actions/layout.actions";

export interface State {
}

const initialState: State = {
}


export const _layoutReducer = createReducer(
  initialState,
  // on(LayoutActions.UserIdentityModalClosed, (state) => {
  //   return {
  //     ...state,
  //     userIdentityModalState: false,
  //     mobileMenuOpened: false,
  //     sortModalOpened: false
  //   }
  // }),
)

export function layoutReducer(state: State | undefined, action: Action) {
  return _layoutReducer(state, action);
}
