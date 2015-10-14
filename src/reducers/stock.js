import { createReducer } from 'utils';
import { STOCK_REQUEST, STOCK_SUCCESS, STOCK_FAILURE } from '../actions/';

const initialState = {
  stockNo: 0,
  isFetching: false,
  stockData: {
    name: '',
    datas: [],
  }
};

export default createReducer(initialState, {
  [STOCK_REQUEST] : (state, action) => {
    return Object.assign({}, state, {
      stockNo: action.stockNo,
      isFetching: true,
    });
  },
  [STOCK_SUCCESS] : (state, action) => {
    return Object.assign({}, state, {
      stockNo: action.stockNo,
      stockData: action.stockData,
      isFetching: false,
    });
  },
  [STOCK_FAILURE] : (state, action) => {
    return Object.assign({}, state, {
      stockNo: action.stockNo,
      isFetching: false,
    });
  }
});
