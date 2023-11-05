import { createSelector } from "reselect";


// initial selector which gives slice of reducers
const selectCategoryReducer = (state) => {
  return state.categories
}

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {return categoriesSlice.categories }
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
   return categories.reduce((acc, category) => {
      const { title, items } = category
      acc[title.toLowerCase()] = items;
      return acc;
    }
      , {})
  }
) 