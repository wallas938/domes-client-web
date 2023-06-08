import {createAction, props} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationTokenResponse, Credentials} from "../../app/models/authentication";
import {ClientGetDTO, ClientPostDTO} from "../../app/models/client";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* GET AUTHENTICATION TOKEN IDENTIFIERS */

const GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_START = '[Authentication]  GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_START';
const GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_SUCCEEDED = '[Authentication]  GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_SUCCEEDED';
const GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_FAILED = '[Authentication]  GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_FAILED';

/* POST CLIENT AUTHENTICATION IDENTIFIERS */

const GET_AUTHENTICATION_TOKEN_FROM_LOGIN_START = '[Authentication]  GET_AUTHENTICATION_TOKEN_FROM_LOGIN_START';
const GET_AUTHENTICATION_TOKEN_FROM_LOGIN_SUCCEEDED = '[Authentication]  GET_AUTHENTICATION_TOKEN_FROM_LOGIN_SUCCEEDED';
const GET_AUTHENTICATION_TOKEN_FROM_LOGIN_FAILED = '[Authentication]  GET_AUTHENTICATION_TOKEN_FROM_LOGIN_FAILED';

/* POST CLIENT AUTHENTICATION IDENTIFIERS */

const LOGOUT_CLIENT_START = '[Authentication]  LOGOUT_CLIENT_START';
const LOGOUT_CLIENT_START_SUCCEEDED = '[Authentication]  LOGOUT_CLIENT_START_SUCCEEDED';
const LOGOUT_CLIENT_START_FAILED = '[Authentication]  LOGOUT_CLIENT_START_FAILED';

const RESET_FIRST_CONNECTION = '[Authentication]  RESET_FIRST_CONNECTION';

const RESET_AUTHENTICATION_ERROR = '[Authentication]  RESET_AUTHENTICATION_ERROR';

/*******
 *
 * ACTIONS
 *
 *******/

/* CLIENT AUTHENTICATION ACTIONS FROM LOGIN*/

const GetAuthenticationTokenFromLoginStart = createAction(GET_AUTHENTICATION_TOKEN_FROM_LOGIN_START, props<{
  credentials: Credentials
}>());
const GetAuthenticationTokenFromLoginSucceeded = createAction(GET_AUTHENTICATION_TOKEN_FROM_LOGIN_SUCCEEDED, props<{
  authenticationTokenResponse: AuthenticationTokenResponse
}>());
const GetAuthenticationTokenFromLoginFailed = createAction(GET_AUTHENTICATION_TOKEN_FROM_LOGIN_FAILED, props<{
  error: HttpErrorResponse
}>());

/* AUTHENTICATION TOKEN ACTIONS FROM SIGNUP */

const GetAuthenticationTokenFromSignupStart = createAction(GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_START, props<{
  clientPostDTO: ClientPostDTO
}>());
const GetAuthenticationTokenFromSignupSucceeded = createAction(GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_SUCCEEDED, props<{
  authenticationTokenResponse: AuthenticationTokenResponse
}>());
const GetAuthenticationTokenFromSignupFailed = createAction(GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_FAILED, props<{
  error: HttpErrorResponse
}>());

/* LOGOUT TOKEN ACTIONS */

const LogoutClientStart = createAction(LOGOUT_CLIENT_START);

const LogoutClientSucceeded = createAction(LOGOUT_CLIENT_START_SUCCEEDED);

const ResetFirstConnection = createAction(RESET_FIRST_CONNECTION);

const ResetAuthenticationError = createAction(RESET_AUTHENTICATION_ERROR);

export const AuthenticationActions = {
  GetAuthenticationTokenFromSignupStart,
  GetAuthenticationTokenFromSignupSucceeded,
  GetAuthenticationTokenFromSignupFailed,
  GetAuthenticationTokenFromLoginStart,
  GetAuthenticationTokenFromLoginSucceeded,
  GetAuthenticationTokenFromLoginFailed,
  LogoutClientStart,
  LogoutClientSucceeded,
  ResetFirstConnection,
  ResetAuthenticationError
};
