import { List } from 'immutable';
import { SearchActions } from './search.actions';
import { ActionReducer, Action } from '@ngrx/store';
import { SearchState, SearchStateRecord } from './search.state';

export const initialState: SearchState = new SearchStateRecord() as SearchState;

export function reducer(state = initialState, { type, payload }: any): SearchState {
    switch (type) {
      case SearchActions.ADD_FILTER:
        let filterAlreadyPresent = false;
        if(state.selectedFilters[payload.taxonomy] && state.selectedFilters[payload.taxonomy].indexOf(payload.taxon) >= 0) {
          filterAlreadyPresent = true;
        }
        // state.selectedFilters.forEach(filter => {
        //   const taxonomy = filter["name"];
        //   if (taxonomy === payload.taxonomy.name && filter["taxons"].indexOf(payload.taxon)) {
        //     filterAlreadyPresent = true;
        //   }
        // });

        if (filterAlreadyPresent) {
          return state;
        } else {
          const _selectedFilters = (state.selectedFilters[payload.taxonomy] || []).slice();
          _selectedFilters.push(payload.taxon);

          // const _selectedTaxonIds = state.selectedTaxonIds.concat(payload.id);
          return {
            selectedFilters: { ...state.selectedFilters, [payload.taxonomy]: _selectedFilters }
          } as SearchState;
        }

      case SearchActions.REMOVE_FILTER:
        let taxons = [ ...state.selectedFilters[payload.taxonomy] ];
        let index = taxons.indexOf(payload.taxon);
        taxons.splice(index, 1);
        state.selectedFilters[payload.taxonomy] = taxons;

        return {
            selectedFilters: { ...state.selectedFilters, [payload.taxonomy]: taxons }
          } as SearchState;

        // let removeIndex = -1;
        // state.selectedFilters.forEach((filter, index) => {
        //   const filterId = filter['id'];
        //   if (filterId === payload.id) {
        //     removeIndex = index;
        //   }
        // });
        // const _selectedFilters = state.selectedFilters.remove(removeIndex);
        // const taxonRemoveIndex = state.selectedTaxonIds.findIndex(filterId => payload.id === filterId);
        // const _selectedTaxonIds = state.selectedTaxonIds.remove(taxonRemoveIndex);

        
        // return state.merge({
        //     selectedFilters: _selectedFilters,
        //     selectedTaxonIds: _selectedTaxonIds
        // }) as SearchState;

      default:
        return state;
    }
  };
