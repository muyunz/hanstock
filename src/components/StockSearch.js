import React, { Component } from 'react';

export default class StockSearch extends Component {

  render() {
    const { onChange } = this.props;
    return (
      <div className="ui input">
        <input type="text" placeholder="股票代號" onChange={ e => onChange(e.target.value)} />
      </div>
    );
  }

}
