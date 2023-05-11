import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromClient from 'src/store/reducers/client.reducer';


const client = createFeatureSelector<fromClient.State>('client');

export const selectLoading = createSelector(client, (state) => {
  return state.loadingState;
});

export const selectClient = createSelector(client, (state) => {
  return state.client;
});

export const selectClientErrorMessage = createSelector(client, (state) => {
  return state.errorMessage;
});

export const ClientSelectors = {
  selectLoading,
  selectClient,
  selectClientErrorMessage
}

