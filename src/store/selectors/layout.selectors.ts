import {createFeatureSelector, createSelector} from "@ngrx/store";
import * as fromLayout from 'src/store/reducers/layout.reducer';


const layout = createFeatureSelector<fromLayout.State>('layout');

const selectMobileMenuOpened = createSelector(layout, (state) => {
  return state.mobileMenuOpened;
});

export const LayoutSelectors = {
  selectMobileMenuOpened
}

