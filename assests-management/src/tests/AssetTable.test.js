// __tests__/AssetTable.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import AssetTable from '../components/AssetTable'; 

const sampleAssets = [
  {
    _id: 'ff4a61f36fc2b5a6fc54233fb7f19cb3',
    created: '2022-01-24T20:15:48.112Z',
    criticalityFactor: 15,
    enrich: {
      assetType: 'COMPUTE',
      env: 'PROD',
      isCrownJewel: false,
      crownJewelIndicator: 'OVERRIDE',
    },
    name: 'tf-instance-SAP-app PROD',
    owner: {
      name: 'David',
    },
    region: 'us-east-1',
    tags: [
      {
        key: 'Account',
        value: 'TravelX Demo',
      },
      {
        key: 'Vesrion',
        value: '1',
      },
    ],
    type: 'Instance',
  },
  {
    _id: 'ff444dd74b30d8f42d96a4993b91053b',
    created: '2022-02-24T20:15:48.112Z',
  },
];

describe('AssetTable Component', () => {
  test('renders asset table correctly', () => {
    render(<AssetTable assets={sampleAssets} />);

    // Test table header labels
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Creation Date')).toBeInTheDocument();
    expect(screen.getByText('Criticality')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Env')).toBeInTheDocument();
    expect(screen.getByText('Is Crown Jewel')).toBeInTheDocument();
    expect(screen.getByText('Asset Name')).toBeInTheDocument();
    expect(screen.getByText("Owner's Name")).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();

    // Test asset data
    sampleAssets.forEach((asset) => {
      expect(screen.getByText(asset._id)).toBeInTheDocument();
      expect(screen.getByText(asset.created)).toBeInTheDocument();
      expect(screen.getByText(asset.criticalityFactor)).toBeInTheDocument();
      expect(screen.getByText(asset.enrich.assetType)).toBeInTheDocument();
      expect(screen.getByText(asset.enrich.env)).toBeInTheDocument();
      expect(screen.getByText(asset.name)).toBeInTheDocument();
      expect(screen.getByText(asset.owner.name)).toBeInTheDocument();

      // Test isCrownJewel icons 
      const crownJewelIcon = screen.getByAltText('Crown Jewel Icon');
      const iconSrc = asset.enrich.isCrownJewel
        ? asset.enrich.crownJewelIndicator === 'OVERRIDE'
          ? 'icons/dashboard-3.png'
          : 'icons/dashboard.png'
        : asset.enrich.crownJewelIndicator === 'OVERRIDE'
        ? 'icons/dashboard-2.png'
        : 'icons/dashboard-1.png';

      expect(crownJewelIcon).toHaveAttribute('src', iconSrc);

      // Test tags
      const tagsCell = screen.getByTestId(`tags-cell-${asset._id}`);
      asset.tags.forEach((tag) => {
        expect(tagsCell).toHaveTextContent(tag.value);
      });
    });
  });
});
