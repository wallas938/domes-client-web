import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromClient from 'src/store/reducers/client.reducer';


const layout = createFeatureSelector<fromClient.State>('client');

const selectLoadingState = createSelector(layout, (state) => {
  return state.loadingState;
});

export const ClientSelectors = {
  selectLoadingState
}

