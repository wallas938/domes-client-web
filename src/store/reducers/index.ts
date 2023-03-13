import { ActionReducerMap } from '@ngrx/store';
import * as fromLayout from 'src/store/reducers/layout.reducer';

export const rootReducer = {};

export interface AppState {
  layout: fromLayout.State,
}

export const reducers: ActionReducerMap<AppState, any> = {
  layout: fromLayout.layoutReducer,
};
