import { ActionReducerMap } from '@ngrx/store';
import * as fromLayout from 'src/store/reducers/layout.reducer';
import * as fromClient from 'src/store/reducers/client.reducer';
import * as fromAnimal from 'src/store/reducers/animal.reducer';
import * as fromAuthentication from 'src/store/reducers/authentication.reducer';
import * as fromRouter from "@ngrx/router-store";
import {RouterSelectors, RouterStateUrl} from "../selectors/router.selectors";

export const rootReducer = {};

export interface AppState {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  client: fromClient.State;
  authentication: fromAuthentication.State;
  animal: fromAnimal.State

}

export const reducers: ActionReducerMap<AppState, any> = {
  layout: fromLayout.layoutReducer,
  router: fromRouter.routerReducer,
  client: fromClient.clientReducer,
  animal: fromAnimal.animalReducer,
  authentication: fromAuthentication.authenticationReducer
};
