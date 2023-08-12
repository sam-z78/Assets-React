import * as actionTypes from '../actions/actionTypes';

const initialState = {
  assets: [],
  filteredAssets: [],
};

const assetReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ASSETS:
      return {
        ...state,
        assets: action.assets,
        filteredAssets: action.assets,
      };
    case actionTypes.FILTER_ASSETS:
      const { dateRange, assetTypes } = action.filters;

      const filteredAssets = state.assets.filter((asset) => {
        const createdAt = new Date(asset.created);
        const startDate = new Date(dateRange.split('-')[0].trim());
        const endDate = new Date(dateRange.split('-')[1].trim());
        const isWithinDateRange =
          createdAt >= startDate && createdAt <= endDate;

        const hasMatchingAssetType =
          assetTypes.length === 0 ||
          assetTypes.includes(asset.enrich.assetType);

        return isWithinDateRange && hasMatchingAssetType;
      });

      return {
        ...state,
        filteredAssets,
      };
    case actionTypes.EDIT_CROWN_JEWEL:
      const updatedAssets = state.assets.map((asset) => {
        if (asset._id === action.assetId) {
          return {
            ...asset,
            enrich: {
              ...asset.enrich,
              isCrownJewel: action.newValue,
            },
          };
        }
        return asset;
      });

      return {
        ...state,
        assets: updatedAssets,
        filteredAssets: updatedAssets.filter((asset) =>
          state.filteredAssets.some((filteredAsset) =>
            filteredAsset._id === asset._id
          )
        ),
      };
    default:
      return state;
  }
};

export default assetReducer;
