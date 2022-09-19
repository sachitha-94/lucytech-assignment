import { store } from 'app/store'

import homeReducer, {
  HomeState,
  fetchProductListAsync,
  setSearchText
} from './homeSlice'

describe('home reducer', () => {
  const initialState: HomeState = {
    productList: {
      data: [],
      status: null
    },
    search: ''
  }

  // check home initial status
  it('check home initial status', () => {
    expect(homeReducer(undefined, { type: 'unknown' })).toEqual({
      productList: {
        data: [],
        status: null
      },
      search: ''
    })
  })

  // check setSearchText action
  it('check setSearchText action', () => {
    const actual = homeReducer(initialState, setSearchText('tv'))
    expect(actual.search).toEqual('tv')
  })

  // check fetch Product List function
  it('check fetch Product List', async () => {
    const response = await store.dispatch(fetchProductListAsync())
    const state = store.getState().home

    expect(response.type).toBe('home/fetchProductList/fulfilled')
    expect(state.productList.data).toEqual(response?.payload)
    expect(state.productList.status).toEqual('idle')
  })
})
