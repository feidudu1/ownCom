import React, { Component } from 'react';
import { fromJS } from 'immutable';
import './index.less';

class S2CenterMap extends Component {
  componentDidMount() {
    // render(this.container, this.defaultData, this.defaultOpt);
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.dataEntries && nextProps.dataEntries.index && nextProps.dataEntries.index.data) {
      // console.log(new Date().getUTCSeconds(), nextProps.dataEntries.index.data);
    }
    return !fromJS(nextProps).equals(fromJS(this.props));
  }
  componentDidUpdate() {
    // render(this.container, this.defaultData, this.defaultOpt);
  }
  componentWillUnmount() {
    // this.props.ws.removeAllListeners();
  }

  render() {
    return (
      <div className="s2CenterMap" ref={(node) => { this.container = node; }}>
        <div className="bg1"></div>
        <div className="loopStatic"></div>
        <div className="loop loop0"></div>
        <div className="loop loop1"></div>
        <div className="loop loop2"></div>
        <div className="loop loop3"></div>
      </div>
    );
  }
}

export default S2CenterMap;
