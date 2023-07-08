import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromCart from 'src/store/reducers/cart.reducer';


const cart = createFeatureSelector<fromCart.State>('cart');

const selectCart = createSelector(cart, (state) => {
  return state.cart;
});

export const CartSelectors = {
  selectCart
}

