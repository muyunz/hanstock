import React       from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import StockSearch from '../components/StockSearch';
import StockNotFound from '../components/StockNotFound';
import StockCrawling from '../components/StockCrawling';
import Table from '../components/Table';
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
    stockNo : React.PropTypes.number,
    stockData : React.PropTypes.object,
  }

  constructor () {
    super();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchStock(10));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stockNo !== this.props.stockNo) {
      const { dispatch, stockNo } = nextProps;
      dispatch(fetchStock(10));
    }
  }

  handleChange(stockNo) {
    this.props.dispatch(fetchStock(stockNo));
  }

  render () {
    const cols = tableHead.map( head => head.name);

    let datas = this.props.stock.stockData.datas;

    const rows = datas.map(function(row) {
      return tableHead.map(function(head) {
        return row[head.field];
      })
    })

    let StockInfo;

    if(this.props.stock.isFetching) {
      StockInfo = <StockCrawling />
    } else if (rows.length != 0 && !this.props.stock.isFetching) {
      StockInfo = <Table cols={cols} rows={rows} />;
    } else {
      StockInfo = <StockNotFound />
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
              {StockInfo}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeView);
