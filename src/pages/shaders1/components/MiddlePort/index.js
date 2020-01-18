import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
// import WSConneted from 'components/WSCompWrapper';
// import Counter from '../Counter2';

import render from './render';
import './index.less';

export class MiddlePort extends Component {
  static propTypes = {
    // mapDataToProps: PropTypes.func,
    // dataEntries: PropTypes.object,
    getShowFrame: PropTypes.func,
    getShowHigh: PropTypes.func,
    highLight: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {};
    // const dataList = {
    //   index: { id: '5a45da1c2251889e7d832c24' },
    // };
    // props.mapDataToProps(() => dataList);
  }

  componentDidMount() {
    render(this.svgId, this.defaultData, this.defaultOpt, this.props.getShowFrame, this.props.getShowHigh);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!(fromJS(nextProps).equals(fromJS(this.props)) && fromJS(nextState).equals(fromJS(this.state)))) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    if (!this.props.highLight) {
      render(this.svgId, this.defaultData, this.defaultOpt, this.props.getShowFrame, this.props.getShowHigh);
    }
  }

  componentWillUnmount() {
  }
  render() {
    this.defaultData = [];
    this.defaultOpt = {
      width: 2920,
      height: 1957,
    };
    return (
      <div>
        <div className="middlePort" ref={(node) => { this.svgId = node; }}></div>
        <div className="portImg"></div>
      </div>
    );
  }
}

export default MiddlePort;
// export default WSConneted(MiddlePort);
