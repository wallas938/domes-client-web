import { Action, createReducer, on } from "@ngrx/store";
import { LayoutActions } from "src/store/actions/layout.actions";

export interface State {
  mobileMenuOpened: boolean
}

const initialState: State = {
  mobileMenuOpened: false
}


export const _layoutReducer = createReducer(
  initialState,
  on(LayoutActions.MobileMenuOpened, (state) => {
    return {
      ...state,
      mobileMenuOpened: true,
    }
  }),
  on(LayoutActions.MobileMenuClosed, (state) => {
    return {
      ...state,
      mobileMenuOpened: false,
    }
  }),
)

export function layoutReducer(state: State | undefined, action: Action) {
  return _layoutReducer(state, action);
}
