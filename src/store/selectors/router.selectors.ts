import {Params} from '@angular/router';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

const selectRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

const selectRouterUrl = createSelector(
  selectRouterState,
  (state) => state.state.url
);

const selectRouterParams = createSelector(
  selectRouterState,
  (state) => state.state.params
);

const selectRouterQueryParams = createSelector(
  selectRouterState,
  (state) => state.state.queryParams
);

export const RouterSelectors = {
  selectRouterUrl,
  selectRouterParams,
  selectRouterQueryParams
}
