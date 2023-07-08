import { Action, createReducer, on } from "@ngrx/store";
import { LayoutActions } from "src/store/actions/layout.actions";
import {AnimalGetDTO} from "../../app/models/animal";
import {CartActions} from "../actions/cart.action";

export interface State {
  cart: AnimalGetDTO[]
}

const initialState: State = {
  cart: []
}


export const _cartReducer = createReducer(
  initialState,
  on(CartActions.AddToCart, (state, {animal}) => {
    const isExist = [...state.cart].find(a => a.id === animal.id)
    return {
      ...state,
      cart: isExist ? [...state.cart] : [...state.cart, animal]
    }
  }),
  on(CartActions.RemoveFromCart, (state, {id}) => {
    return {
      ...state,
      cart: [...state.cart].filter(value => value.id === id)
    }
  }),
)

export function cartReducer(state: State | undefined, action: Action) {
  return _cartReducer(state, action);
}
