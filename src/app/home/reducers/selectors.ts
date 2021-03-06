import { HomeState } from './index';
import { SearchState } from './search.state';
import { AppState } from './../../interfaces';
import { createSelector, createFeatureSelector } from '@ngrx/store';

/******************* Base Search State ******************/
export const getHomeState = createFeatureSelector<HomeState>('home');

export const getSearchState = createSelector(
  getHomeState,
  (state: HomeState) => state.search
);

/******************* Individual selectors ******************/
function fetchSelectedFilters(state: SearchState) {
    return state.selectedFilters;
};

// function fetchSelectedTaxonIds(state: SearchState) {
//     return state.selectedTaxonIds.toJS();
// }

/******************* Public Selector API's ******************/
export const getFilters = createSelector(getSearchState, fetchSelectedFilters);
// export const getSelectedTaxonIds = createSelector(getSearchState, fetchSelectedTaxonIds);
