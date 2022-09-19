import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

import { fetchProductList } from './homeAPI'
import { Article, Category, ChildCategoryList, ProductList } from './types'

export interface HomeState {
  productList: ProductList
  search: string
}

const initialState: HomeState = {
  productList: { data: [], status: null },
  search: ''
}

export const fetchProductListAsync = createAsyncThunk(
  'home/fetchProductList',
  async () => {
    const response = await fetchProductList()

    return response?.data?.data?.categories
  }
)

export const homeSlice = createSlice({
  name: 'home',
  initialState,

  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductListAsync.pending, (state) => {
        state.productList.status = 'loading'
      })
      .addCase(fetchProductListAsync.fulfilled, (state, action) => {
        state.productList.status = 'idle'
        state.productList.data = action.payload
      })
      .addCase(fetchProductListAsync.rejected, (state) => {
        state.productList.status = 'failed'
        state.productList.data = []
      })
  }
})

export const { setSearchText } = homeSlice.actions

export const selectProductList = (state: RootState): ProductList =>
  state?.home?.productList

export const selectSearch = (state: RootState): string => state?.home?.search

export const splitArticleList = (category: Category): Article[][] => {
  const perChunk = 6 // items per chunk

  const chunkArticleList: Article[][] = []
  for (
    let i = 0;
    i < category?.categoryArticles.articles?.length;
    i += perChunk
  ) {
    const chunk = category?.categoryArticles.articles?.slice(i, i + perChunk)
    chunkArticleList.push(chunk)
  }
  return chunkArticleList
}

export const splitCategoryList = (
  category: Category
): ChildCategoryList[][] => {
  const perChunk = 6 // items per chunk

  const chunkCategoryList: ChildCategoryList[][] = []
  for (
    let i = 0;
    i < category?.childrenCategories.list?.length;
    i += perChunk
  ) {
    const chunk = category?.childrenCategories.list?.slice(i, i + perChunk)
    chunkCategoryList.push(chunk)
  }
  return chunkCategoryList
}

export default homeSlice.reducer
