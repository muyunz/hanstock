import React       from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import StockSearch from '../components/StockSearch';
import StockNotFound from '../components/StockNotFound';
import StockCrawling from '../components/StockCrawling';
import Table from '../components/Table';
import Chart from '../components/Chart';
import { fetchStock } from '../actions';

const mapStateToProps = (state) => ({
  stock: state.stock
});

const tableHead = [
  {field: 'date', name : '日期'},
  {field: 'trading_volume', name : '成交股數'},
  {field: 'turnover', name : '成交金額'},
  {field: 'open', name : '開盤價'},
  {field: 'high', name : '最高價'},
  {field: 'low', name : '最低價'},
  {field: 'close', name : '收盤價'},
  {field: 'price_limit', name : '漲跌價差'},
  {field: 'transaction_number', name : '成交筆數'}
];

export class HomeView extends React.Component {
  static propTypes = {
    dispatch : React.PropTypes.func,
    stock : React.PropTypes.object,
  }

  constructor () {
    super();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchStock(10));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, stockNo } = nextProps;

    if (nextProps.stockNo !== stockNo) {
      dispatch(fetchStock(10));
    }
  }

  handleChange(stockNo) {
    this.props.dispatch(fetchStock(stockNo));
  }

  render () {
    const cols = tableHead.map(head => head.name);

    const datas = this.props.stock.stockData.datas;

    const rows = datas.map(function(data) {
      return tableHead.map(function(head) {
        return data[head.field];
      });
    });

    let StockInfo = null;
    let StockChart = null;

    // 建立圖表資訊
    const closeLine = {
      labels: datas.map(function(data) {
        return data.date;
      }),
      datasets: [
        {
          label: '收盤價',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: datas.map(function(data) {
            return data.close;
          })
        }
      ]
    };

    if (this.props.stock.isFetching) {
      StockInfo = <StockCrawling />;
    } else if (rows.length !== 0 && !this.props.stock.isFetching) {
      StockInfo = <Table cols={cols} rows={rows} />;
      StockChart = <Chart lines={[closeLine]}/>;
    } else {
      StockInfo = <StockNotFound />;
    }

    return (
      <div className="home-view">
        <div className="ui grid">

          <div className="row">
            <div className="column">
              <Header />
            </div>
          </div>

          <div className="row">
            <div className="column">
              <StockSearch onChange={this.handleChange.bind(this)} />
            </div>
          </div>

          <div className="row">
            <div className="ten wide column centered">
                <h5></h5>
              {StockInfo}
            </div>
          </div>

          <div className="row">
            <div className="ten wide column centered">
              {StockChart}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeView);
