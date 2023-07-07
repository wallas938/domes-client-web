import {createAction, props} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationTokenResponse, Credentials} from "../../app/models/authentication";
import {AnimalGetDTO, AnimalSearchQuery, Category, Specie} from "../../app/models/animal/index";
import {CategoryName} from "../../app/models/animal/category";

/*******
 *
 * IDENTIFIERS
 *
 *******/

/* GET ANIMALS IDENTIFIERS */

const GET_ANIMALS_START = '[Animals]  GET_ANIMALS_START';
const GET_ANIMALS_SUCCEEDED = '[Animals]  GET_ANIMALS_SUCCEEDED';
const GET_ANIMALS_FAILED = '[Animals]  GET_ANIMALS_FAILED';

/* GET ANIMALS BY FILTERING IDENTIFIERS */

const GET_ANIMALS_BY_FILTERING_START = '[Animals]  GET_ANIMALS_BY_FILTERING_START';
const GET_ANIMALS_BY_FILTERING_SUCCEEDED = '[Animals]  GET_ANIMALS_BY_FILTERING_SUCCEEDED';
const GET_ANIMALS_BY_FILTERING_FAILED = '[Animals]  GET_ANIMALS_BY_FILTERING_FAILED';

/* GET SPECIES BY CATEGORY IDENTIFIERS */

const GET_SPECIES_BY_CATEGORY_START = '[Animals]  GET_SPECIES_BY_CATEGORY_START';
const GET_SPECIES_BY_CATEGORY_SUCCEEDED = '[Animals]  GET_SPECIES_BY_CATEGORY_SUCCEEDED';
const GET_SPECIES_BY_CATEGORY_FAILED = '[Animals]  GET_SPECIES_BY_CATEGORY_FAILED';

/* GET CATEGORIES IDENTIFIERS */

const GET_CATEGORIES_START = '[Animals]  GET_CATEGORIES_START';
const GET_CATEGORIES_SUCCEEDED = '[Animals]  GET_CATEGORIES_SUCCEEDED';
const GET_CATEGORIES_FAILED = '[Animals]  GET_CATEGORIES_FAILED';

/* RESET PAGE_NUMBER IDENTIFIERS */

const RESET_PAGE_NUMBER_START = '[Animals]  RESET_PAGE_NUMBER_START';
const RESET_PAGE_NUMBER_SUCCEEDED = '[Animals]  RESET_PAGE_NUMBER_SUCCEEDED';

/* GET ANIMALS BY SEARCH IDENTIFIERS */

const GET_ANIMALS_BY_SEARCH_START = '[Animals]  GET_ANIMALS_BY_SEARCH_START';
const GET_ANIMALS_BY_SEARCH_SUCCEEDED = '[Animals]  GET_ANIMALS_BY_SEARCH_SUCCEEDED';
const GET_ANIMALS_BY_SEARCH_FAILED = '[Animals]  GET_ANIMALS_BY_SEARCH_FAILED';

/*******
 *
 * ACTIONS
 *
 *******/

/* ANIMALS ACTIONS */

const GetAnimalsStart = createAction(GET_ANIMALS_START, props<{
  pageNumber: number
}>());
const GetAnimalsSucceeded = createAction(GET_ANIMALS_SUCCEEDED, props<{
  payload: AnimalGetDTO[]
}>());
const GetAnimalsFailed = createAction(GET_ANIMALS_FAILED, props<{
  error: HttpErrorResponse
}>());

const GetAnimalsBySearchStart = createAction(GET_ANIMALS_BY_SEARCH_START, props<{
  pageNumber: number, searchValue: string
}>());
const GetAnimalsBySearchSucceeded = createAction(GET_ANIMALS_BY_SEARCH_SUCCEEDED, props<{
  payload: AnimalGetDTO[], searchValue: string
}>());
const GetAnimalsBySearchFailed = createAction(GET_ANIMALS_BY_SEARCH_FAILED, props<{
  error: HttpErrorResponse
}>());

const GetAnimalsByFilteringStart = createAction(GET_ANIMALS_BY_FILTERING_START, props<{
  animalSearchQuery: AnimalSearchQuery, pageSize: number
}>());
const GetAnimalsByFilteringSucceeded = createAction(GET_ANIMALS_BY_FILTERING_SUCCEEDED, props<{
  payload: AnimalGetDTO[]
}>());
const GetAnimalsByFilteringFailed = createAction(GET_ANIMALS_BY_FILTERING_FAILED, props<{
  error: HttpErrorResponse
}>());

const GetSpeciesByCategoryStart = createAction(GET_SPECIES_BY_CATEGORY_START, props<{
  category: Category
}>());
const GetSpeciesByCategorySucceeded = createAction(GET_SPECIES_BY_CATEGORY_SUCCEEDED, props<{
  payload: Specie[]
}>());
const GetSpeciesByCategoryFailed = createAction(GET_SPECIES_BY_CATEGORY_FAILED, props<{
  error: HttpErrorResponse
}>());

const GetCategoriesStart = createAction(GET_CATEGORIES_START);

const GetCategoriesSucceeded = createAction(GET_CATEGORIES_SUCCEEDED, props<{
  payload: Category[]
}>());
const GetCategoriesFailed = createAction(GET_CATEGORIES_FAILED, props<{
  error: HttpErrorResponse
}>());

const ResetPageNumber = createAction(RESET_PAGE_NUMBER_START);

export const AnimalActions = {
  GetAnimalsStart,
  GetAnimalsSucceeded,
  GetAnimalsFailed,
  GetAnimalsByFilteringStart,
  GetAnimalsByFilteringSucceeded,
  GetAnimalsByFilteringFailed,
  GetSpeciesByCategoryStart,
  GetSpeciesByCategorySucceeded,
  GetSpeciesByCategoryFailed,
  GetCategoriesStart,
  GetCategoriesSucceeded,
  GetCategoriesFailed,
  ResetPageNumber,
  GetAnimalsBySearchStart,
  GetAnimalsBySearchSucceeded,
  GetAnimalsBySearchFailed
};
