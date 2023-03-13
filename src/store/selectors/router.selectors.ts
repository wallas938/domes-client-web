import {Params} from '@angular/router';
import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
};

export const selectRouterState = createFeatureSelector<AppState>('router');

export const selectRouterUrl = createSelector(
  selectRouterState,
  (state) => state.router.state.url
);

export const selectRouterParams = createSelector(
  selectRouterState,
  (state) => state.router.state.params
);

export const selectRouterQueryParams = createSelector(
  selectRouterState,
  (state) => state.router.state.queryParams
);

export const RouterSelectors = {
  selectRouterUrl,
  selectRouterParams,
  selectRouterQueryParams
}
