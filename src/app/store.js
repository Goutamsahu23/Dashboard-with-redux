import { configureStore } from '@reduxjs/toolkit';
import widgetsReducer from '../features/widgetsSlice';
import searchReducer from '../features/searchSlice';

export const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
    search: searchReducer,
  },
});
