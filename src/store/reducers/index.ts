import { ActionReducerMap } from '@ngrx/store';
import * as fromLayout from 'src/store/reducers/layout.reducer';
import * as fromRouter from "@ngrx/router-store";
import {RouterStateUrl} from "../selectors/router.selectors";

export const rootReducer = {};

export interface AppState {
  layout: fromLayout.State,
  router: fromRouter.RouterReducerState<RouterStateUrl>;

}

export const reducers: ActionReducerMap<AppState, any> = {
  layout: fromLayout.layoutReducer,
  router: fromRouter.routerReducer,

};
