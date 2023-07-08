import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromAnimal from 'src/store/reducers/animal.reducer';


const animal = createFeatureSelector<fromAnimal.State>('animal');

const selectLoading = createSelector(animal, (state) => {
  return state.loadingState;
});

const selectAnimal = createSelector(animal, (state) => {
  return state.animal;
});

const selectSearchValue = createSelector(animal, (state) => {
  return state.searchValue;
});

const selectIsSearchValueChange = createSelector(animal, (state) => {
  return state.searchDataChange;
});


const selectSpecies = createSelector(animal, (state) => {
  return state.species;
});

const selectCategories = createSelector(animal, (state) => {
  return state.categories;
});

const selectIsFirstDataLoading = createSelector(animal, (state) => {
  return state.isFirstDataLoading;
});

const selectPageNumber = createSelector(animal, (state) => {
  return state.pageNumber;
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
  selectAnimal,
  selectPageNumber,
  selectClientErrorMessage,
  selectIsFirstDataLoading,
  selectSpecies,
  selectCategories,
  selectSearchValue,
  selectIsSearchValueChange
}

