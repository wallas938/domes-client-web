import {Params} from '@angular/router';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export const selectRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

export const selectRouterUrl = createSelector(
  selectRouterState,
  (state) => state.state.url
);

export const selectRouterParams = createSelector(
  selectRouterState,
  (state) => state.state.params
);

export const selectRouterQueryParams = createSelector(
  selectRouterState,
  (state) => state.state.queryParams
);

export const RouterSelectors = {
  selectRouterUrl,
  selectRouterParams,
  selectRouterQueryParams
}
