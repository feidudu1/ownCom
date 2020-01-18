import React from 'react';
// import WSConneted from 'components/WSCompWrapper';
import { fromJS } from 'immutable';

import render from './render';
import './index.less';

class LeftTopCarouselImg extends React.Component {
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
    render(this.id, this.defaultData, this.defaultOpt, this.getChooseNum);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(fromJS(nextProps).equals(fromJS(this.props)) && fromJS(nextState).equals(fromJS(this.state)));
  }
  componentDidUpdate(prevProps) {
    if (!(fromJS(prevProps).equals(fromJS(this.props)))) {
      render(this.id, this.defaultData, this.defaultOpt, this.getChooseNum);
    }
  }
  componentWillUnmount() {
  }
  getChooseNum = (v) => {
    this.setState({
      chooseNum: v,
    });
  }
  render() {
    this.defaultData = [
      { x: '国家级生态原产地保护示范区', y: '/shaders2/carousel/1.png', z: '/shaders2/carousel/1.1.png' },
      { x: '生态原产地产品保护证书', y: '/shaders2/carousel/2.png', z: '/shaders2/carousel/2.1.png' },
      { x: '柠檬汇达绿色食品', y: '/shaders2/carousel/3.png', z: '/shaders2/carousel/3.1.png' },
      { x: '全国名特优农产品目录', y: '/shaders2/carousel/4.png', z: '/shaders2/carousel/4.1.png' },
      { x: '国家级出口食品农产品安全示范区', y: '/shaders2/carousel/5.png', z: '/shaders2/carousel/5.1.png' },
      { x: '汇达重点龙头企业荣誉集景', y: '/shaders2/carousel/6.png', z: '/shaders2/carousel/6.1.png' },
    ];
    this.defaultOpt = {
      width: 450,
      height: 283,
    };
    return (
      <div className="leftTopCarouselImg">
        <canvas className="bottomThree" ref={(node) => { this.id = node; }}></canvas>
        <div className="topExhibition">
          <div className="topExhibition-box">
            {
              this.defaultData.map((d, i) => <img key={`${d + i}`} className={i === this.state.chooseNum ? 'showImg imgStyle' : 'imgStyle'} src={d.y} alt="" />)
            }
            {
              this.defaultData.map((d, i) => <div key={`${d + i}`} className={i === this.state.chooseNum ? 'text textShow' : 'text'} style={{ width: `${d.x.length * 12}px` }}>{d.x}</div>)
            }
            <div className="icon icon1"></div>
            <div className="icon icon2"></div>
            <div className="icon icon3"></div>
            <div className="icon icon4"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftTopCarouselImg;
