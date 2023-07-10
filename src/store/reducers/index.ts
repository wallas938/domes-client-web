import { ActionReducerMap } from '@ngrx/store';
import * as fromLayout from 'src/store/reducers/layout.reducer';
import * as fromClient from 'src/store/reducers/client.reducer';
import * as fromAnimal from 'src/store/reducers/animal.reducer';
import * as fromCart from 'src/store/reducers/cart.reducer';
import * as fromAuthentication from 'src/store/reducers/authentication.reducer';
import * as fromOrder from 'src/store/reducers/order.reducer';
import * as fromRouter from "@ngrx/router-store";
import {RouterSelectors, RouterStateUrl} from "../selectors/router.selectors";
import {orderReducer} from "./order.reducer";

export const rootReducer = {};

export interface AppState {
  layout: fromLayout.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  client: fromClient.State;
  authentication: fromAuthentication.State;
  animal: fromAnimal.State,
  cart: fromCart.State
  order: fromOrder.State

}

export const reducers: ActionReducerMap<AppState, any> = {
  layout: fromLayout.layoutReducer,
  router: fromRouter.routerReducer,
  client: fromClient.clientReducer,
  animal: fromAnimal.animalReducer,
  cart: fromCart.cartReducer,
  order: fromOrder.orderReducer,
  authentication: fromAuthentication.authenticationReducer
};
