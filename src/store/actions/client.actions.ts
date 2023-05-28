import {createAction, props} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {ClientGetDTO, ClientPostDTO} from "../../app/models/client";
import {AuthenticationTokenResponse} from "../../app/models/authentication";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* POST CLIENT IDENTIFIERS */

const POST_CLIENT_START = '[Client]  POST_CLIENT_START';
const POST_CLIENT_SUCCEEDED = '[Client]  POST_CLIENT_SUCCEEDED';
const POST_CLIENT_FAILED = '[Client]  POST_CLIENT_FAILED';

/* GET CLIENT IDENTIFIERS */

const GET_CLIENT_START = '[Client]  GET_CLIENT_START';
const GET_CLIENT_SUCCEEDED = '[Client]  GET_CLIENT_SUCCEEDED';
const GET_CLIENT_FAILED = '[Client]  GET_CLIENT_FAILED';

/*******
 *
 * ACTIONS
 *
 *******/

/* CLIENT ACTIONS */

const PostClientStart = createAction(POST_CLIENT_START, props<{ clientPostDTO: ClientPostDTO }>());
const PostClientSucceeded = createAction(POST_CLIENT_SUCCEEDED, props<{ clientGetDTO: ClientGetDTO }>());
const PostClientFailed = createAction(POST_CLIENT_FAILED, props<{ error: HttpErrorResponse }>());

const GetClientStart = createAction(GET_CLIENT_START, props<{ email: string }>());
const GetClientSucceeded = createAction(GET_CLIENT_SUCCEEDED, props<{ clientGetDTO: ClientGetDTO }>());
const GetClientFailed = createAction(GET_CLIENT_FAILED, props<{ error: HttpErrorResponse }>());


export const ClientActions = {
  PostClientStart,
  PostClientSucceeded,
  PostClientFailed,
  GetClientStart,
  GetClientSucceeded,
  GetClientFailed
};
