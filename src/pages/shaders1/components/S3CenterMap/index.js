import React, { Component } from 'react';
import { fromJS } from 'immutable';

import render from './render';
import './index.less';

class MiddleMap extends Component {
  componentDidMount() {
    render(this.svgId, this.defaultData1, this.defaultData2, this.defaultData3, this.defaultOpt);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(fromJS(nextProps).equals(fromJS(this.props)) && fromJS(nextState).equals(fromJS(this.state)));
  }
  componentDidUpdate() {
    render(this.svgId, this.defaultData1, this.defaultData2, this.defaultData3, this.defaultOpt);
  }
  componentWillUnmount() {
    // this.props.ws.removeAllListeners();
  }

  render() {
    this.defaultData1 = [
      { x: '上港集团罗泾分公司', y: [1069, 454] },
      { x: '罗泾矿石码头有限公司', y: [1115, 472] },
      { x: '上港集团煤炭分公司', y: [1177, 469] },
      { x: '宝钢原料码头', y: [1380, 566] },
      { x: '宝钢化产码头', y: [1418, 590] },
      { x: '宝钢全天候码头', y: [1469, 633] },
      { x: '宝钢综合码头', y: [1620, 705] },
      { x: '宝钢成品码头', y: [1664, 734] },
      { x: '上港集团宜东分公司', y: [1808, 1012] },
      { x: '上港集团张华浜分公司', y: [1824, 1031] },
      { x: '外滩公务码头', y: [1761, 1968] },
    ];
    this.defaultData2 = [
      { x: '石洞口煤气制气有限公司', y: [1269, 573] },
      { x: '石洞口第二电厂', y: [1254, 607] },
      { x: '石洞口第一电厂', y: [1320, 638] },
      { x: '东真船厂公司', y: [1879, 1132] },
      { x: '华荣达仓储公司', y: [2108, 1240] },
      { x: '何家湾陆军油库', y: [2171, 1280] },
      { x: '海运局中燃公司', y: [2218, 1329] },
      { x: '上海水产公司', y: [2240, 1423] },
      { x: '华利船务有限公司', y: [2278, 1574] },
      { x: '沪东中华造船有限公司', y: [2324, 1673] },
      { x: '杨树浦打捞局', y: [2160, 1851] },
      { x: '上海船厂西厂', y: [2009, 1891] },
    ];
    this.defaultData3 = [
      { x: '“S15-20”浮筒', y: [2283.5, 1430] },
      { x: '“B1-10”浮筒', y: [2303.5, 1496] },
      { x: '“B10-20”浮筒', y: [2339.5, 1578] },
      { x: '“B20-30”浮筒', y: [2334.5, 1751] },
    ];
    this.defaultOpt = {
      width: 2922,
      height: 2102,
    };
    return (
      <div className="middleMap" ref={(node) => { this.svgId = node; }}>
      </div>
    );
  }
}

export default MiddleMap;
