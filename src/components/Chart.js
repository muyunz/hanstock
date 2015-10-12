import React, { Component } from 'react';
import { Line } from 'react-chartjs';

const chartOptions = {

  // Sets the chart to be responsive
  responsive: true,

  //Boolean - Whether we should show a stroke on each segment
  segmentShowStroke: true,

  //String - The colour of each segment stroke
  segmentStrokeColor: '#fff',

  //Number - The width of each segment stroke
  segmentStrokeWidth: 2,

  //Number - The percentage of the chart that we cut out of the middle
  percentageInnerCutout: 50, // This is 0 for Pie charts

  //Number - Amount of animation steps
  animationSteps: 100,

  //String - Animation easing effect
  animationEasing: 'easeOutBounce',

  //Boolean - Whether we animate the rotation of the Doughnut
  animateRotate: true,

  //Boolean - Whether we animate scaling the Doughnut from the centre
  animateScale: false,

};

export default class Chart extends Component {

  static propTypes = {
    lines: React.PropTypes.array
  }

  render() {

    return (
      <div className="stockChart">
        <Line data={this.props.lines} options={chartOptions}/>
      </div>
    );
  }
}

