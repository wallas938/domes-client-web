import {createAction, props} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {OrderGetDTO, OrderPostDTO} from "../../app/models/order";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* POST CLIENT ORDER */

const POST_ORDER_START = '[Order]  POST_ORDER_START';
const POST_ORDER_SUCCEEDED = '[Order]  POST_ORDER_SUCCEEDED';
const POST_ORDER_FAILED = '[Order]  POST_ORDER_FAILED';

/*******
 *
 * ACTIONS
 *
 *******/

/* POST CLIENT ORDER */

const PostOrderStart = createAction(POST_ORDER_START, props<{
  order: OrderPostDTO
}>());
const PostOrderSucceeded = createAction(POST_ORDER_SUCCEEDED, props<{
  order: OrderGetDTO
}>());

const PostOrderFailed = createAction(POST_ORDER_FAILED, props<{
  error: HttpErrorResponse
}>());

export const OrderActions = {
  PostOrderStart,
  PostOrderSucceeded,
  PostOrderFailed,
};
