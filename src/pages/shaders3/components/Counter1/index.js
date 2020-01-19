/* eslint-disable */
import React, { Component } from 'react';
// import { fromJS } from 'immutable';
import './index.less';

export default class Counter1 extends Component {
  constructor() {
    super();
    this.state = {
      number: 0,
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   // if (!fromJS(nextProps).equals(fromJS(this.props))) {
  //   // console.info('dif', this.state.number, this.state.difference, nextProps);
  //   // }
  // }

  // componentDidMount() {
  //   const color = this.props.option.color || '#fff';
  //   this.spanNum.style.color = color;
  //   this.spanUnit.style.color = color;
  // }

  shouldComponentUpdate() {
    const data = this.state.data;
    const number = this.state.number;
    if (data > 0) {
      if (number === data || number === +data.toFixed(0)) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { option, data } = this.props;
    const { unit = '', unitSup = '', color = '#D8D8D8' } = option || {};
    if (data > 0 && this.state.number !== data && this.state.number !== +data.toFixed(1)) {
      let iniData = this.state.number;
      const count = () => {
        const interval = data - this.state.number;
        if (Math.abs(interval) > 100) {
          iniData = this.state.number + (interval / 4);
          this.speed = 50;
        } else if (Math.abs(interval) < 1) {
          this.speed = 20;
          if (interval > 0) {
            iniData = this.state.number + 1;
          } else {
            iniData = this.state.number - 1;
          }
        } else {
          this.speed = 20;
          if (interval > 0) {
            iniData = this.state.number + 1;
          } else {
            iniData = this.state.number - 1;
          }
        }
        this.setState({
          // number: +iniData.toFixed(1),
          number: +iniData.toFixed(0),
        });
      };
      setTimeout(count, this.speed);
    }
    const colorStyle = {
      color,
    };
    return (
      <div className="counter1">
        <span className="spanNum" style={colorStyle}>{this.state.number}</span>
        <span className="spanUnit" style={colorStyle}>{unit || ''}</span>
        <sup>{unitSup}</sup>
      </div>
    );
  }
}

Counter1.propTypes = {
  // option: React.PropTypes.object,
  // data: React.PropTypes.number,
};
