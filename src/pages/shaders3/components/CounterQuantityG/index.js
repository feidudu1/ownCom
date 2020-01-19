/* eslint-disable */
import React from 'react';
import './index.less';
import CounterBar from '../CounterBar';
import Counter from '../Counter1';

const CounterQuantityG = (props) =>
  <div className="counterQ">
    <p>{props.option.title}</p>
    <CounterBar data={props.data} data1={props.data1} option={props.option.counterBar} />
    <Counter data={props.data} option={props.option.counter} />
  </div>;

CounterQuantityG.propTypes = {
  // option: React.PropTypes.object,
  // data: React.PropTypes.number,
  // data1: React.PropTypes.number,
};

export default CounterQuantityG;
