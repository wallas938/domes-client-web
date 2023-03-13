import { ActionReducerMap } from '@ngrx/store';
import * as fromLayout from './reducers/layout.reducer';

export interface AppState {
  layout: fromLayout.State,
}

export const reducers: ActionReducerMap<AppState, any> = {
  layout: fromLayout.layoutReducer,
};
