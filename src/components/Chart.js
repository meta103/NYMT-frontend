import React, { Component } from 'react';
import { RadialChart } from 'react-vis';
import { withAuth } from '../components/AuthProvider';

class Chart extends Component {
  state = {
    value: this.props.rate,
    rest: 100 - this.props.rate,
  };
  render() {
    return (
      <RadialChart
        className={'donut-chart-example'}
        innerRadius={100}
        radius={140}
        getAngle={d => d.theta}
        data={[
          { theta: this.props.rate, color: '#57BC90' },
          { theta: 100 - this.props.rate, color: "#E36B7A" },
        ]}
        width={345}
        height={345}

        colorRange={['#57BC90', '#E36B7A']}
      >
      </RadialChart>
    );
  }
}

export default withAuth()(Chart);