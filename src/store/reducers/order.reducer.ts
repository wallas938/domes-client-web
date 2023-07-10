import {Action, createReducer, on} from "@ngrx/store";
import {OrderGetDTO} from "../../app/models/order";
import {OrderActions} from "../actions/order.action";

export interface State {
  loadingState: boolean;
  orders: OrderGetDTO[];
  errorMessage: any;
}

const initialState: State = {
  orders: [],
  errorMessage: '',
  loadingState: false
}


export const _orderReducer = createReducer(
  initialState,
  on(OrderActions.PostOrderStart, (state) => {
    return {
      ...state,
      loadingState: true,
    }
  }),
  on(OrderActions.PostOrderSucceeded, (state, {order}) => {
    return {
      ...state,
      errorMessage: '',
      loadingState: false,
      orders: [...state.orders, order]
    }
  }),
  on(OrderActions.PostOrderFailed, (state, {error}) => {
    return {
      ...state,
      errorMessage: error
    }
  }),
)

export function orderReducer(state: State | undefined, action: Action) {
  return _orderReducer(state, action);
}
