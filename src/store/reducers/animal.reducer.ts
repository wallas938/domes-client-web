import {Action, createReducer, on} from "@ngrx/store";
import {AnimalActions} from "src/store/actions/animal.action";
import {AnimalGetDTO, AnimalSearchQuery, Article, Category, Specie} from "../../app/models/animal/index";
import {CategoryName} from "../../app/models/animal/category";

export interface State {
  loadingState: boolean,
  animals: AnimalGetDTO[],
  animal: AnimalGetDTO | null,
  species: Specie[],
  categories: Category[],
  isFirstDataLoading: boolean,
  errorMessage: any,
  pageNumber: number,
  searchDataChange: boolean,
  searchValue: string
  // animalSearchQuery: AnimalSearchQuery
}

const initialState: State = {
  loadingState: false,
  species: [],
  categories: [],
  isFirstDataLoading: true,
  searchDataChange: false,
  searchValue: '',
  pageNumber: 0,
  animals: [],
  animal: {} as AnimalGetDTO | null,
  errorMessage: {},
}


export const _animalReducer = createReducer(
  initialState,
  on(AnimalActions.GetAnimalsStart, (state) => {
    return {
      ...state,
      loadingState: true,
    }
  }),
  on(AnimalActions.GetAnimalsSucceeded, (state, {payload}) => {
    return {
      ...state,
      animals: [...state.animals, ...payload],
      errorMessage: '',
      loadingState: false,
      pageNumber: payload.length > 0 ? state.pageNumber + 1 : state.pageNumber,
      isFirstDataLoading: state.isFirstDataLoading === true && false
    }
  }),
  on(AnimalActions.GetAnimalsFailed, (state, {error}) => {
    return {
      ...state,
      loadingState: false,
      errorMessage: error,
    }
  }),
  on(AnimalActions.GetAnimalsByFilteringStart, (state,{animalSearchQuery}) => {
    return {
      ...state,
      loadingState: true,
      pageNumber: state.animals.length > 0 ? state.pageNumber + 1 : state.pageNumber,
    }
  }),
  on(AnimalActions.GetAnimalsByFilteringSucceeded, (state, {payload}) => {
    return {
      ...state,
      errorMessage: '',
      loadingState: false,
      animals: [...state.animals, ...payload]
    }
  }),
  on(AnimalActions.GetAnimalsByFilteringFailed, (state, {error}) => {
    return {
      ...state,
      loadingState: false,
      errorMessage: error,
    }
  }),
  on(AnimalActions.GetCategoriesStart, (state) => {
    return {
      ...state,
      loadingState: true,
    }
  }),
  on(AnimalActions.GetCategoriesSucceeded, (state, {payload}) => {
    return {
      ...state,
      errorMessage: '',
      loadingState: false,
      categories: [{name: 'ALL', id: 'ALL'}, ...payload],
    }
  }),
  on(AnimalActions.GetCategoriesFailed, (state, {error}) => {
    return {
      ...state,
      loadingState: false,
      errorMessage: error,
    }
  }),
  on(AnimalActions.GetSpeciesByCategoryStart, (state,{category}) => {
    return {
      ...state,
      loadingState: true,
    }
  }),
  on(AnimalActions.GetSpeciesByCategorySucceeded, (state, {payload}) => {
    return {
      ...state,
      errorMessage: '',
      loadingState: false,
      species: payload,
    }
  }),
  on(AnimalActions.GetAnimalsBySearchStart, (state, {pageNumber}) => {
    return {
      ...state,
      loadingState: false,
      pageNumber: pageNumber
    }
  }),
  on(AnimalActions.GetAnimalsBySearchSucceeded, (state, {payload, searchValue}) => {
    return {
      ...state,
      loadingState: false,
      errorMessage: '',
      animals: payload,
      searchValue: searchValue
    }
  }),
  on(AnimalActions.GetAnimalsBySearchFailed, (state, {error}) => {
    return {
      ...state,
      loadingState: false,
      errorMessage: error,
    }
  }),
  on(AnimalActions.ResetPageNumber, (state) => {
    return {
      ...state,
      loadingState: true,
      pageNumber: 0
    }
  }),
)

export function animalReducer(state: State | undefined, action: Action) {
  return _animalReducer(state, action);
}
