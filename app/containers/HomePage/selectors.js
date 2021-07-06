import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

/**
 * Other specific selectors
 */

const selectLoading = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.loading,
  );

const selectData = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.data,
  );

const selectDataError = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.dataError,
  );

const selectCorsError = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate.corsError,
  );

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () =>
  createSelector(
    selectHomePageDomain,
    substate => substate,
  );

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  selectLoading,
  selectData,
  selectDataError,
  selectCorsError,
};
