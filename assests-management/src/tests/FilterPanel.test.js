
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterPanel from '../src/FilterPanel'; 

describe('FilterPanel Component', () => {
  test('renders filter panel correctly', () => {
    const mockFilterHandler = jest.fn();
    render(<FilterPanel onFilter={mockFilterHandler} />);

    const dateInput = screen.getByLabelText('Created Date');
    const assetTypeInput = screen.getByLabelText('Asset Type');
    const nameInput = screen.getByLabelText('Asset Name');

    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    fireEvent.change(assetTypeInput, { target: { value: 'COMPUTE' } });
    fireEvent.change(nameInput, { target: { value: 'Test Asset' } });


    const filterButton = screen.getByText('Apply Filters');
    fireEvent.click(filterButton);

    expect(mockFilterHandler).toHaveBeenCalledTimes(1);
    expect(mockFilterHandler).toHaveBeenCalledWith({
      date: '2023-01-01',
      assetType: 'COMPUTE',
      name: 'Test Asset',
    });
  });

});
