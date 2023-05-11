import { createAction, props } from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {ClientPostDTO} from "../../app/models/client";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* POST CLIENT IDENTIFIERS */

const POST_CLIENT_START = '[Client]  POST_CLIENT_START';
const POST_CLIENT_SUCCEEDED = '[Client]  POST_CLIENT_SUCCEEDED';
const POST_CLIENT_FAILED = '[Client]  POST_CLIENT_FAILED';

/*******
 *
 * ACTIONS
 *
 *******/

/* CLIENT ACTIONS */

const PostClientStart = createAction(POST_CLIENT_START, props<{ clientPostDTO: ClientPostDTO }>());
const PostClientSucceeded = createAction(POST_CLIENT_SUCCEEDED);
const PostClientFailed = createAction(POST_CLIENT_FAILED, props<{ error: HttpErrorResponse }>());


export const ClientActions = {
  PostClientStart,
  PostClientSucceeded,
  PostClientFailed
};
