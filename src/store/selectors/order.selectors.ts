import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromOrder from 'src/store/reducers/order.reducer';


const order = createFeatureSelector<fromOrder.State>('order');

const selectLoading = createSelector(order, (state) => {
  return state.loadingState;
});

const selectOrders = createSelector(order, (state) => {
  return state.orders;
});

const selectErrorMessage = createSelector(order, (state) => {
  return state.errorMessage;
});

export const OrderSelectors = {
  selectLoading,
  selectOrders,
  selectErrorMessage
}

