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

const GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_START = '[AuthenticationTokenFromSignup]  GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_START';
const GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_SUCCEEDED = '[AuthenticationTokenFromSignup]  GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_SUCCEEDED';
const GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_FAILED = '[AuthenticationTokenFromSignup]  GET_AUTHENTICATION_TOKEN_FROM_SIGNUP_FAILED';

/* POST CLIENT AUTHENTICATION IDENTIFIERS */

const GET_AUTHENTICATION_TOKEN_FROM_LOGIN_START = '[AuthenticationTokenFromLogin]  GET_AUTHENTICATION_TOKEN_FROM_LOGIN_START';
const GET_AUTHENTICATION_TOKEN_FROM_LOGIN_SUCCEEDED = '[AuthenticationTokenFromLogin]  GET_AUTHENTICATION_TOKEN_FROM_LOGIN_SUCCEEDED';
const GET_AUTHENTICATION_TOKEN_FROM_LOGIN_FAILED = '[AuthenticationTokenFromLogin]  GET_AUTHENTICATION_TOKEN_FROM_LOGIN_FAILED';

/*******
 *
 * ACTIONS
 *
 *******/

/* CLIENT AUTHENTICATION ACTIONS */

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


export const AuthenticationActions = {
  GetAuthenticationTokenFromSignupStart,
  GetAuthenticationTokenFromSignupSucceeded,
  GetAuthenticationTokenFromSignupFailed,
  GetAuthenticationTokenFromLoginStart,
  GetAuthenticationTokenFromLoginSucceeded,
  GetAuthenticationTokenFromLoginFailed
};
