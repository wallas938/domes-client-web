import * as fromAuthentication from 'src/store/reducers/authentication.reducer';
import {createFeatureSelector, createSelector} from "@ngrx/store";


const authentication = createFeatureSelector<fromAuthentication.State>('authentication');

export const selectLoading = createSelector(authentication, (state) => {
  return state.loadingState;
});

export const selectAuthenticationToken = createSelector(authentication, (state) => {
  return state.authenticationToken;
});

// const selectClientErrorMessageState = createSelector(authentication, (state) => {
//   return state.errorMessage;
// });
