/* eslint-disable */
import React from 'react';
import FlyingLine from '../FlyingLine';
import Lightning from '../Lightning';
import WonderRect from '../WonderRect';
import LoadingRect from '../LoadingRect';
// import EnergyRect from 'components/EnergyRect';
// import WEnergyBar from 'components/WEnergyBar';
import WEnergyBarCanvas from '../WEnergyBarCanvas';
import { Link } from 'react-router';
import './index.less';

const MiddleBall = (props) =>
<div>
  <div className="middleBall">
    <FlyingLine option={props.option.flying1} />
    <FlyingLine option={props.option.flying1} />
    <Lightning option={props.option.ball} />
    <WonderRect />
    <LoadingRect />
    <div className="energyBarParent">
      <WEnergyBarCanvas option={props.option.wEnergyBar1} />
      <WEnergyBarCanvas option={props.option.wEnergyBar2} />
    </div>
    <div className="innerRing"></div>
    <div className="innerRing1"></div>
    <div className="shiningTri"></div>
    <div className="ring1"></div>
    <div className="ring2"></div>
    <div className="ring3"></div>
    <span className="ballTitle">数据总条数<span>/亿条</span></span>
    <div className="counter">
      <span className="spanNum">{props.stock}</span>
      {/* <span className="spanUnit">/TB</span> */}
    </div>
  </div>
</div>;

MiddleBall.propTypes = {
  // option: React.PropTypes.object,
};

export default MiddleBall;
