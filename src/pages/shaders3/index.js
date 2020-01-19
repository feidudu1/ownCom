import {connect} from 'dva';
import CounterQuantityG from './components/CounterQuantityG';
import MiddleBall from './components/MiddleBall';

import {
  Component,
} from 'react';

import style from './index.less';

const middleBallOptions = {
      flying1: {
        height: 124,
        width: 280,
      },
      ball: {
        cw: 600,
        ch: 600,
        count: 5,
        startHue: 200,
        startVel: 180,
      },
      counter: {
        unit: '/TB',
      },
      wEnergyBar1: {
        width: 180,
        height: 180,
        startAng: Math.PI / 6,
        arcNum: 18,
        rangeAng: Math.PI / 3,
        arcRange: 3,
        gapRange: 1,
        direction: true,
        radius: 80,
        lineW: 20,
        circleX: 85,
        circleY: 94,
        color1: '#1cfcff',
        color2: '#185491',
      },
      wEnergyBar2: {
        width: 180,
        height: 180,
        startAng: -((5 * Math.PI) / 6),
        arcNum: 18,
        rangeAng: Math.PI / 3,
        arcRange: 3,
        gapRange: 1,
        direction: true,
        radius: 80,
        lineW: 20,
        circleX: 95,
        circleY: 94,
        color1: '#1cfcff',
        color2: '#185491',
      },
 };

class S1 extends Component {
  constructor (props) {
    super(props);
    this.state = {
      odsWareCount: 20,
      data1: 20,
      counterWOptions1: {
        title: '库总数量',
        counterBar: {
          color: '#2aa7ff',
        },
        counter: {
          unit: '个',
          color: '#2aa7ff',
        },
      },
      stock: 82.91
    };
  }

  componentDidMount () {
    // console.log(111, xiaoData);

  }

  componentWillUnmount () {
  }

  render () {
    const {
      xiaoshanData
    } = this.props;
    return (
      <div className={style.main}>
        <CounterQuantityG 
          data={this.state.odsWareCount} 
          data1={this.state.data1} 
          option={this.state.counterWOptions1}
        />

        <MiddleBall 
          option={middleBallOptions}  
          stock={this.state.stock}
        />
      </div>
    )
  }
}

// function mapStateToProps (state) {
//   // console.log(555, state.s1.xiaoshanData);
//   const {
//     xiaoshanData
//   } = state.s1
//   return {
//     xiaoshanData
//   };
// }

 export default S1;
// export default connect(mapStateToProps)(S1);
//  export default withRouter(connect(mapStateToProps)(S4));
