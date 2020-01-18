import React from 'react';
import { fromJS } from 'immutable';
import mapData from './data'
import renderChart from './render';
import './index.less';

class WorldMap extends React.Component {
  static propTypes = {
    // mapDataToProps: React.PropTypes.func,
    // dataEntries: React.PropTypes.object,
    // // getEventValue: React.PropTypes.func,
    // ws: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {
      chooseNum: 0,
    };
    // const dataList = {
    //   index1: { id: '5d394d958c080704a0762670' },
    // };
    // props.mapDataToProps(() => dataList);
  }
  componentDidMount() {
    renderChart(
      this.lineContainer,
      this.defaultData,
      this.defaultData2,
      this.defaultOpt,
      this.canvas,
      this.state.chooseNum,
    );
    this.start();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(fromJS(nextProps).equals(fromJS(this.props)) && fromJS(nextState).equals(fromJS(this.state)));
  }
  componentDidUpdate() {
    renderChart(
      this.lineContainer,
      this.defaultData,
      this.defaultData2,
      this.defaultOpt,
      this.canvas,
      this.state.chooseNum,
    );
  }
  componentWillUnmount() {
    // this.props.ws.removeAllListeners();
  }
  num = 0;
  starting = () => {
    this.requestId = requestAnimationFrame(this.starting);
    this.num += 1;
    if (this.num > 600) {
      if (this.state.chooseNum === 2) {
        this.setState({
          chooseNum: 0,
        });
      } else {
        this.setState({
          chooseNum: this.state.chooseNum + 1,
        });
      }
      this.num = 0;
    }
  }
  start = () => {
    if (!this.requestId) {
      this.starting();
    }
  };
  stop = () => {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  };

  render() {
    const data1 = [];
    if (mapData && mapData.index1 && mapData.index1.data && mapData.index1.data.length > 0) {
      const dataset1 = mapData.index1.data;
      dataset1.forEach((d) => {
        data1.push({
          name: d.name || '',
          x: d.pointX ? parseFloat(d.pointX) : 0,
          y: d.pointY ? parseFloat(d.pointY) : 0,
        });
      });
      this.defaultData = data1;
    } else {
      this.defaultData = [];
    }
    this.defaultData2 = [
      { x: '亚洲市场全球占比', y: 38, z: '%' },
      { x: '欧盟市场全球占比', y: 28, z: '%' },
      { x: '北美市场全球占比', y: 30, z: '%' },
    ];
    this.defaultOpt = {
      width: 554,
      height: 263,
    };
    return (
      <div className="worldMap" ref={(node) => { this.lineContainer = node; }}>
        <canvas className="canvas" ref={(node) => { this.canvas = node; }} />
      </div>
    );
  }
}

export default WorldMap;
