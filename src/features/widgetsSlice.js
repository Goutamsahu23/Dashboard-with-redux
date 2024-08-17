import { createSlice } from '@reduxjs/toolkit';
import { initialData } from '../data/data';

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState: initialData,setSearchQuery:'',
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      // console.log(categoryId)
      console.log(widget)
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets.push({ id: Date.now(), ...widget });
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        console.log(category.selectedWidgets)
        category.selectedWidgets = category.selectedWidgets.filter(id => id !== widgetId);
      }
    },
    toggleWidgetSelection(state, action) {
        const { categoryId, widgetId } = action.payload;
        const category = state.categories.find(cat => cat.id === categoryId);
        if (category) {
            const isSelected = category.selectedWidgets.includes(widgetId);
            if (isSelected) {
                category.selectedWidgets = category.selectedWidgets.filter(id => id !== widgetId);
            } else {
                category.selectedWidgets.push(widgetId);
            }
        }
    },
  },
});

export const { addWidget, removeWidget,toggleWidgetSelection } = widgetsSlice.actions;
export default widgetsSlice.reducer;
