import React, { Component } from 'react';

export default class Table extends Component {

  static propTypes = {
    cols : React.PropTypes.array,
    rows : React.PropTypes.array
  }

  render() {
    const cols = this.props.cols;
    const rows = this.props.rows;

    return (
      <table className="ui table">
        <thead>
          <tr>
            {cols.map(function(title) {
              return <th key={title}>{title}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map(function(row, i) {
            return (
              <tr key={i}>
                {row.map(function(_row, j) {
                  return <td key={j}>{_row}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

