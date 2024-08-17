import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        categoryQuery: '', // for categories
        widgetQuery: '', // for widgets
    },
    reducers: {
        setCategorySearchQuery: (state, action) => {
            state.categoryQuery = action.payload;
        },
        setWidgetSearchQuery: (state, action) => {
            state.widgetQuery = action.payload;
        },
    },
});

export const { setCategorySearchQuery, setWidgetSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
