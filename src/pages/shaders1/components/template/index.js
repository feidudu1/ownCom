import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {fromJS} from 'immutable';
import render from './render';
import style from './index.less';

class SnowBall extends Component {
  static propTypes = {
    data: PropTypes.array,
    opts: PropTypes.object,
  };

  componentDidMount () {
    render(this.node, this.props.data, this.props.opts);
}

  shouldComponentUpdate (nextProps) {
    return !(fromJS(nextProps).equals(fromJS(this.props)));
}

  componentDidUpdate () {
    render(this.node, this.props.data, this.props.opts);
}

  render () {
    const {data} = this.props;
    return (
      <div className="wrap_snowBall">
        <div className="com_wrap_snowBall" ref={(node) => { this.node = node; }} />
      </div>
    );
}
}

export default SnowBall;
