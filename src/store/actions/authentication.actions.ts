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

/*******
 *
 * ACTIONS
 *
 *******/

/* AUTHENTICATION TOKEN ACTIONS */

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
  GetAuthenticationTokenFromSignupFailed
};
