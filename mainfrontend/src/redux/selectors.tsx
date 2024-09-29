// selectors.tsx
import { createSelector } from 'reselect';
import { RootState } from './store';

// Selector to select all properties from the state
const selectItems = (state: RootState) => state.properties.userProperties;

// Factory function to create a selector for finding a property by ID
export const makeSelectItemById = () =>
  createSelector(
    [selectItems, (_: RootState, id: number) => id], 
    (properties, id) => properties?.find(property => property.id === id)
  );
