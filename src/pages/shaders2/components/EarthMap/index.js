import React, { Component } from 'react';
import { fromJS } from 'immutable';
import eachData from './data'
import render from './render';
import './index.styl';

class EarthMap extends Component {
  static propTypes = {
    // mapDataToProps: React.PropTypes.func,
    // dataEntries: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
    // const dataIndexList = {
    //   index1: { id: '5d394e708c080704a0762672' }, // 主产地，弹框数据
    //   index2: { id: '5d394ea18c080704a0762674' }, // 出口国，圆数据
    //   index3: { id: '5d394eba8c080704a0762676' }, // 进口国，光柱数据
    //   index4: { id: '5d395a398c080704a076267e' }, // 重庆出口国家飞线数据
    // };
    // props.mapDataToProps(() => dataIndexList);
  }
  componentDidMount() {
    if (this.defaultDate1.length > 0 && this.defaultDate2.length > 0 && this.defaultDate3.length > 0 && this.defaultDate4.length > 0) {
      setTimeout(() => {
        render(
          this.three,
          this.threeDiv,
          this.defaultDate1, // 弹框数据
          this.defaultDate2, // 圆坐标
          this.defaultDate3, // 光柱
          this.defaultDate4, // 重庆飞线数据
          this.defaultOpt,
        );
      }, 0);
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !(fromJS(nextProps).equals(fromJS(this.props)) && fromJS(nextState).equals(fromJS(this.state)));
  }
  componentDidUpdate() {
    if (this.defaultDate1.length > 0 && this.defaultDate2.length > 0 && this.defaultDate3.length > 0 && this.defaultDate4.length > 0) {
      setTimeout(() => {
        render(
          this.three,
          this.threeDiv,
          this.defaultDate1, // 弹框数据
          this.defaultDate2, // 圆坐标
          this.defaultDate3, // 光柱
          this.defaultDate4, // 重庆飞线数据
          this.defaultOpt,
        );
      }, 0);
    }
  }
  componentWillUnmount() {
  }

  render() {
    // 弹框数据
    const data1 = [];
    if (Object.keys(eachData).length > 0 && eachData.index1 && eachData.index1.data && eachData.index1.data.length > 0) {
      const dataset = eachData.index1.data;
      let imgUrl = '';
      dataset.forEach((d) => {
        if (d.ChineseName) {
          switch (d.ChineseName) {
            case '中国':
              imgUrl = '/static/imgs/s1/ningmeng1.png';
              data1.push({
                lat: d.lat || '',
                lng: d.lng || '',
                name: `${d.ChineseName || ''}·${d.area || ''}`,
                value: d.export_quantity ? parseFloat(d.export_quantity) : 0,
                money: d.export_amount ? parseFloat(d.export_amount) : 0,
                export: d.exporter || '',
                imgUrl,
                lemonName: d.lemon_name || '',
              });
              break;
            case '阿根廷':
              imgUrl = '/static/imgs/s1/ningmeng4.png';
              data1.push({
                lat: d.lat || '',
                lng: d.lng || '',
                name: `${d.ChineseName || ''}·${d.area || ''}`,
                value: d.export_quantity ? parseFloat(d.export_quantity) : 0,
                money: d.export_amount ? parseFloat(d.export_amount) : 0,
                export: d.exporter || '',
                imgUrl,
                lemonName: d.lemon_name || '',
              });
              break;
            case '法国':
              imgUrl = '/static/imgs/s1/ningmeng3.png';
              data1.push({
                lat: d.lat || '',
                lng: d.lng || '',
                name: `${d.ChineseName || ''}·${d.area || ''}`,
                value: d.export_quantity ? parseFloat(d.export_quantity) : 0,
                money: d.export_amount ? parseFloat(d.export_amount) : 0,
                export: d.exporter || '',
                imgUrl,
                lemonName: d.lemon_name || '',
              });
              break;
            case '意大利':
              imgUrl = '/static/imgs/s1/ningmeng2.png';
              data1.push({
                lat: d.lat || '',
                lng: d.lng || '',
                name: `${d.ChineseName || ''}·${d.area || ''}`,
                value: d.export_quantity ? parseFloat(d.export_quantity) : 0,
                money: d.export_amount ? parseFloat(d.export_amount) : 0,
                export: d.exporter || '',
                imgUrl,
                lemonName: d.lemon_name || '',
              });
              break;
            default:
              imgUrl = '/static/imgs/s1/ningmeng5.png';
              data1.push({
                lat: d.lat || '',
                lng: d.lng || '',
                name: `${d.ChineseName || ''}·${d.area || ''}`,
                value: d.export_quantity ? parseFloat(d.export_quantity) : 0,
                money: d.export_amount ? parseFloat(d.export_amount) : 0,
                export: d.exporter || '',
                imgUrl,
                lemonName: d.lemon_name || '',
              });
          }
        }
        // data1.push({
        //   lat: d.lat || '',
        //   lng: d.lng || '',
        //   name: `${d.ChineseName || ''}·${d.area || ''}`,
        //   value: d.export_quantity ? parseFloat(d.export_quantity) : 0,
        //   money: d.export_amount ? parseFloat(d.export_amount) : 0,
        //   export: d.exporter || '',
        // });
      });
      this.defaultDate1 = data1;
    } else {
      this.defaultDate1 = [];
    }
    // 圆坐标
    const data2 = [];
    if (Object.keys(eachData).length > 0 && eachData.index2 && eachData.index2.data && eachData.index2.data.length > 0) {
      const dataset2 = eachData.index2.data;
      dataset2.forEach((d) => {
        data2.push({
          lat: d.latitude || '',
          lng: d.longitude || '',
          value: parseFloat(d.export_quantity) || 0,
        });
      });
      this.defaultDate2 = data2;
    } else {
      this.defaultDate2 = [];
    }
    // 光柱数据
    const data3 = [];
    if (Object.keys(eachData).length > 0 && eachData.index3 && eachData.index3.data && eachData.index3.data.length > 0) {
      const dataset3 = eachData.index3.data;
      dataset3.forEach((d) => {
        data3.push({
          lat: d.latitude || '',
          lng: d.longitude || '',
          value: parseFloat(d.import_quantity) || 0,
        });
      });
      this.defaultDate3 = data3;
    } else {
      this.defaultDate3 = [];
    }
    // 重庆出口国家
    const data4 = [];
    if (Object.keys(eachData).length > 0 && eachData.index4 && eachData.index4.data && eachData.index4.data.length > 0) {
      const dataset4 = eachData.index4.data;
      dataset4.forEach((d) => {
        data4.push({
          lat: d.latitude || '',
          lng: d.longitude || '',
        });
      });
      this.defaultDate4 = data4;
    } else {
      this.defaultDate4 = [];
    }
    this.defaultOpt = {
      w: 1920,
      h: 1080,
    };
    return (
      <div id="earthMapContainers">
        <canvas id="canvas" ref={(node) => { this.three = node; }}></canvas>
        <div className="circleDataDiv" ref={(node) => { this.threeDiv = node; }} />
      </div>
    );
  }
}

export default EarthMap;
