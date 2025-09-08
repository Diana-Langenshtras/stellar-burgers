import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

type TIngredientsSliceState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientsSliceState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => ({
        ...state,
        isLoading: true,
        error: null
      }))
      .addCase(fetchIngredients.fulfilled, (state, action) => ({
        ...state,
        ingredients: action.payload,
        isLoading: false
      }))
      .addCase(fetchIngredients.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message || null
      }));
  }
});

const selectIngredientsState = (state: {
  ingredients: TIngredientsSliceState;
}) => state.ingredients;

export const selectIngredients = createSelector(
  selectIngredientsState,
  (s) => s.ingredients
);

export const selectIsLoading = createSelector(
  selectIngredientsState,
  (s) => s.isLoading
);

export const selectError = createSelector(
  selectIngredientsState,
  (s) => s.error
);

const makeSelectByType = (type: string) =>
  createSelector(selectIngredients, (ingredients) =>
    ingredients.filter((ingredient) => ingredient.type === type)
  );

export const selectBuns = makeSelectByType('bun');
export const selectSauces = makeSelectByType('sauce');
export const selectMains = makeSelectByType('main');

export default ingredientsSlice.reducer;
