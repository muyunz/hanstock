import fetch from 'isomorphic-fetch';
import CSV from 'comma-separated-values';
import async from 'async';
const CROS_URL = 'http://crossorigin.me/';
const API_HISTORY_URL = 'http://www.twse.com.tw/ch/trading/exchange/STOCK_DAY/STOCK_DAY_print.php?genpage=genpage/';
const API_CURRENT_URL = 'http://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=';
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
    const apiHistoryUrl = API_HISTORY_URL + `Report201510/201510_F3_1_8_${stockNo}.php&type=csv`;
    const apiCurrentUrl = API_CURRENT_URL + `tse_${stockNo}.tw`;

    dispatch(getStockRequest(stockNo));

    return async.parallel({
      current: function(callback) {
        fetch(apiCurrentUrl)
          .then(response => response.json())
          .then(json => callback(null, json));
      },
      history: function(callback) {
        fetch(apiHistoryUrl)
          .then(response => response.text())
          .then(text => callback(null, text));
      }
    }, function(err, results) {

      var text = results.history;
      var current = results.currnet;

      if (text === '') dispatch(getStockFailure(stockNo));

      let lines = text.split('\n');
      // 去除開頭兩行標題與欄位行
      lines.splice(0, 2);

      lines = lines.join('\r\n');

      const datas = new CSV(lines, {
        header: FIELDS
      }).parse();

      const stockData = {
        name: current.nf,
        datas: datas
      };

      dispatch(getStockSuccess(stockNo, stockData));
    });

    return fetch(apiHistoryUrl)
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
