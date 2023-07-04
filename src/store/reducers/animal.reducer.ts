import {Action, createReducer, on} from "@ngrx/store";
import {AnimalActions} from "src/store/actions/animal.action";
import {AnimalGetDTO, Article} from "../../app/models/animal/index";

export interface State {
  loadingState: boolean,
  animals: AnimalGetDTO[],
  animal: AnimalGetDTO | null,
  batch: number,
  isFirstDataLoading: boolean,
  errorMessage: any
}

const initialState: State = {
  loadingState: false,
  isFirstDataLoading: true,
  batch: 0,
  animals: [],
  animal: {} as AnimalGetDTO | null,
  errorMessage: {}
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
      batch: state.batch + 1,
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
)

export function animalReducer(state: State | undefined, action: Action) {
  return _animalReducer(state, action);
}
