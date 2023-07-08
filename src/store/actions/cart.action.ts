import { createAction, props } from "@ngrx/store";
import {AnimalGetDTO} from "../../app/models/animal";

/* CART IDENTIFIERS */
const ADD_TO_CART = '[CART] ADD_TO_CART';

const REMOVE_FROM_CART = '[CART] REMOVE_FROM_CART';

/* CART ACTIONS */
const AddToCart = createAction(ADD_TO_CART, props<({
  animal: AnimalGetDTO
})>());

const RemoveFromCart = createAction(REMOVE_FROM_CART, props<({
  id: string
})>());

export const CartActions = {
  AddToCart,
  RemoveFromCart
};
