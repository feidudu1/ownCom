/* eslint-disable */
import React from 'react';
import d3 from 'd3';
import './index.less';
const CounterBar = (props) => {
  const { data, data1, option } = props;
  const { color } = option;
  const scale = d3.scale.linear()
    .domain([0, data1])
    .range([0, 90]);
  const style = {
    width: `${scale(data)}px`,
    borderTopWidth: `${scale(data)}px`,
    borderTopColor: color,
  };
  return (
    <div className="barCover">
      <div className="bar" style={style}></div>
    </div>
  );
};

CounterBar.propTypes = {
  // data: React.PropTypes.number,
  // data1: React.PropTypes.number,
  // option: React.PropTypes.object,
};

export default CounterBar;
