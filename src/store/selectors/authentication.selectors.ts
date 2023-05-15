import * as fromAuthentication from 'src/store/reducers/authentication.reducer';
import {createFeatureSelector, createSelector} from "@ngrx/store";


const authentication = createFeatureSelector<fromAuthentication.State>('authentication');

const selectLoading = createSelector(authentication, (state) => {
  return state.loadingState;
});

const selectAuthenticationToken = createSelector(authentication, (state) => {
  return state.authenticationToken;
});

export const AuthenticationSelectors = {
  selectLoading,
  selectAuthenticationToken
};
