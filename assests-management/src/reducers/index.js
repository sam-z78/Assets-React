
import { combineReducers } from 'redux';
import assetReducer from './assetReducer';

const rootReducer = combineReducers({
  assets: assetReducer,
});

export default rootReducer;
