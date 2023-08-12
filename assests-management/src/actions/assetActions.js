
import * as actionTypes from './actionTypes';

export const fetchAssets = (assets) => ({
  type: actionTypes.FETCH_ASSETS,
  assets,
});

export const filterAssets = (filters) => ({
  type: actionTypes.FILTER_ASSETS,
  filters,
});

export const editCrownJewel = (assetId, newValue) => ({
  type: actionTypes.EDIT_CROWN_JEWEL,
  assetId,
  newValue,
});
