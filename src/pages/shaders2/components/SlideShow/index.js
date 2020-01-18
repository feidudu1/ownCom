import React from 'react';
import { fromJS } from 'immutable';
import './index.less';

class SlideShow extends React.Component {
  static propTypes = {
    // mapDataToProps: React.PropTypes.func,
    // dataEntries: React.PropTypes.object,
    // getEventValue: React.PropTypes.func,
    // ws: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    // this.state = {
    //   chooseNum: 0,
    // };
    this.count = 0;
    this.lock = true;
    this.requestID = null;
    this.last = 0;
    this.speedCount = 0;
    this.speed = 180;
    // const dataList = {
    // //   index1: { id: '5d39518e8c080704a076267d' },
    // };

    // props.mapDataToProps(() => dataList);
  }
  componentDidMount() {
    this.move();
    this.start();
  }

  shouldComponentUpdate(nextProps) {
    return !fromJS(this.props).equals(fromJS(nextProps));
  }
  componentDidUpdate() {
  }
  componentWillUnmount() {
    // this.props.ws.removeAllListeners();
  }
  // 清除上一个的状态
  move = () => {
    if (this.picContainer) {
      const last = this.data.length - 1;
      let left;
      let leftouter;
      if (this.count === this.data.length) {
        this.count = 0;
      }
      if (this.count === 0) {
        left = last;
      } else {
        left = this.count - 1;
      }
      if (left === 0) {
        leftouter = last;
      } else {
        leftouter = left - 1;
      }
      const right = (this.count + 1) % this.data.length;
      const rightouter = (this.count + 2) % this.data.length;
      // 上一个被选中的
      this.last = this.count;
      // 图片
      this.picContainer.children[left].className = 'left';
      this.picContainer.children[leftouter].className = 'leftouter';
      this.picContainer.children[right].className = 'right';
      this.picContainer.children[rightouter].className = 'rightouter';
      this.picContainer.children[this.count].className = 'current';
      // 导航栏
    //   this.nav.children[left].children[0].className = 'inactive';
    //   this.nav.children[this.count].children[0].className = 'active';
    //   for (let i = 0; i < this.data.length; i += 1) {
    //     if (i !== left && i !== leftouter && i !== this.count && i !== right && i !== rightouter) {
    //       this.picContainer.children[i].className = '';
    //     }
    //   }
      this.count += 1;
    }
  }
  // 循环
  loop = () => {
    this.requestID = requestAnimationFrame(this.loop);
    if (this.speedCount === this.speed) {
      this.move();
      this.speedCount = 0;
    } else {
      this.speedCount += 1;
    }
  }
  // 开始循坏
  start = () => {
    if (!this.requestID) {
      this.loop();
    }
  }
  // 停止循坏
  stop = () => {
    if (this.requestID) {
      cancelAnimationFrame(this.requestID);
      this.requestID = undefined;
    }
  }

  render() {
    this.data = [{
      x: '2018潼南国际柠檬节开幕会',
      y: '/shaders2/huodong/img1.png',
    }, {
      x: '2018潼南国际柠檬节签约仪式',
      y: '/shaders2/huodong/img2.png',
    }, {
      x: '2019年1月参加第十八届西部农交会',
      y: '/shaders2/huodong/img3.png',
    }, {
      x: '2018潼南国际柠檬节开幕会',
      y: '/shaders2/huodong/img1.png',
    // }, {
      x: '2018潼南国际柠檬节签约仪式',
      y: '/shaders2/huodong/img2.png',
    }, {
      x: '2019年1月参加第十八届西部农交会',
      y: '/shaders2/huodong/img3.png',
    }];
    const pics = [];
    for (let i = 0; i < this.data.length; i += 1) {
      const url = this.data[i].y;
      pics.push(<div key={`pic${i}`}><img alt="暂无图片" src={url} /><span>{this.data[i].x || ''}</span></div>);
    }
    return (
      <div className="slideShow">
        <div className="wrap">
          <div className="picContainer" ref={(node) => { this.picContainer = node; }}>
            {pics}
          </div>
        </div>
      </div>
    );
  }
}

export default SlideShow;
