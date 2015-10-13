import fetch from 'isomorphic-fetch';
import CSV from 'comma-separated-values';

const API_ROOT = 'http://crossorigin.me/http://www.twse.com.tw/ch/trading/exchange/STOCK_DAY/STOCK_DAY_print.php?genpage=genpage/';
const FIELDS = ['date', 'trading_volume', 'turnover', 'open', 'high', 'low', 'close', 'price_limit', 'transaction_number'];

export const STOCK_REQUEST = 'STOCK_REQUEST';
export const STOCK_SUCCESS = 'STOCK_SUCCESS';
export const STOCK_FAILURE = 'STOCK_FAILURE';

function getStockRequest(stockNo) {
  return {
    type: STOCK_REQUEST,
    payload: {
      stockNo: stockNo
    }
  };
}

function getStockSuccess(stockNo, stockData) {
  return {
    type: STOCK_SUCCESS,
    payload: {
      stockNo: stockNo,
      stockData: stockData
    }
  };
}

function getStockFailure(stockNo) {
  return {
    type: STOCK_FAILURE,
    payload: {
      stockNo: stockNo
    }
  };
}

export function fetchStock(stockNo) {
  return dispatch => {
    const apiUrl = API_ROOT + `Report201510/201510_F3_1_8_${stockNo}.php&type=csv`;
    dispatch(getStockRequest(apiUrl));
    return fetch(apiUrl)
      .then(response => response.text())
      .then(text => {
        if (text === '') dispatch(getStockFailure(stockNo));

        let lines = text.split('\n');
        // 去除開頭兩行標題與欄位行
        lines.splice(0, 2);

        lines = lines.join('\r\n');

        const datas = new CSV(lines, {
          header: FIELDS
        }).parse();

        const stockData = {
          datas: datas
        };

        dispatch(getStockSuccess(stockNo, stockData));
      });
  };
}
