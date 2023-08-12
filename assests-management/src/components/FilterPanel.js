
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { filterAssets } from '../actions/assetActions';
import './FilterPanel.css'

const FilterPanel = ({ applyFilters }) => {
  const [dateRange, setDateRange] = useState('');
  const [assetTypes, setAssetTypes] = useState('');

  const handleApplyFilters = () => {
    applyFilters({
      dateRange,
      assetTypes: assetTypes.split(',').map((type) => type.trim()),
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Date Range (e.g. 1/1/2023-2/2/2023)"
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
      />
      <input
        type="text"
        placeholder="Asset Types (comma separated)"
        value={assetTypes}
        onChange={(e) => setAssetTypes(e.target.value)}
      />
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  applyFilters: (filters) => dispatch(filterAssets(filters)),
});

export default connect(null, mapDispatchToProps)(FilterPanel);
