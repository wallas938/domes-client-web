import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromClient from 'src/store/reducers/client.reducer';


const client = createFeatureSelector<fromClient.State>('client');

const selectLoading = createSelector(client, (state) => {
  return state.loadingState;
});

const selectClient = createSelector(client, (state) => {
  return state.client;
});

const selectClientErrorMessage = createSelector(client, (state) => {
  return state.errorMessage;
});

const selectHasJustSignedUpStatus = createSelector(client, (state) => {
  return state.hasJustSignedUp;
});

export const ClientSelectors = {
  selectLoading,
  selectClient,
  selectClientErrorMessage,
  selectHasJustSignedUpStatus
}

