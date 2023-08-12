import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import FilterPanel from './components/FilterPanel';
import AssetTable from './components/AssetTable';
import { fetchAssets } from './actions/assetActions'; 
import assetsData from './assets.json';
import './App.css' 


const store = configureStore();

const App = () => {
  useEffect(() => {
    // Simulate fetching assets from an API
    store.dispatch(fetchAssets(assetsData));
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Asset Management</h1>
        <FilterPanel />
        <AssetTable />
      </div>
    </Provider>
  );
};

export default App;
