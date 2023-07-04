import {createAction, props} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationTokenResponse, Credentials} from "../../app/models/authentication";
import {AnimalGetDTO} from "../../app/models/animal/index";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* GET ANIMALS IDENTIFIERS */

const GET_ANIMALS_START = '[Animals]  GET_ANIMALS_START';
const GET_ANIMALS_SUCCEEDED = '[Animals]  GET_ANIMALS_SUCCEEDED';
const GET_ANIMALS_FAILED = '[Animals]  GET_ANIMALS_FAILED';

/*******
 *
 * ACTIONS
 *
 *******/

/* ANIMALS ACTIONS */

const GetAnimalsStart = createAction(GET_ANIMALS_START, props<{
  batch: number
}>());
const GetAnimalsSucceeded = createAction(GET_ANIMALS_SUCCEEDED, props<{
  payload: AnimalGetDTO[]
}>());
const GetAnimalsFailed = createAction(GET_ANIMALS_FAILED, props<{
  error: HttpErrorResponse
}>());

export const AnimalActions = {
  GetAnimalsStart,
  GetAnimalsSucceeded,
  GetAnimalsFailed
};
