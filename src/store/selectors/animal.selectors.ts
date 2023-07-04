import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromAnimal from 'src/store/reducers/animal.reducer';


const animal = createFeatureSelector<fromAnimal.State>('animal');

const selectLoading = createSelector(animal, (state) => {
  return state.loadingState;
});

const selectIsFirstDataLoading = createSelector(animal, (state) => {
  return state.isFirstDataLoading;
});

const selectBatch = createSelector(animal, (state) => {
  return state.batch;
});

const selectAnimals = createSelector(animal, (state) => {
  return state.animals;
});

const selectClientErrorMessage = createSelector(animal, (state) => {
  return state.errorMessage;
});

export const AnimalSelectors = {
  selectLoading,
  selectAnimals,
  selectBatch,
  selectClientErrorMessage,
  selectIsFirstDataLoading
}

