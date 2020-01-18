import {connect} from 'dva';
import MiddlePort from './components/MiddlePort';
import PieBg from './components/PieBg';
import PieCheck from './components/PieCheck';
import S2CenterMap from './components/S2CenterMap';
import S3CenterMap from './components/S3CenterMap';
import MusicLine from './components/MusicLine';

import {
  Component,
} from 'react';

import './index.less';
// import style from './index.less';

class S1 extends Component {
  constructor (props) {
    super(props);
    this.state = {
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
      <div className='main'>
        <div className='comItem'>
          <MiddlePort 
          getShowFrame={'v'}
          getShowHigh={'v'}
          highLight={false}
          />
        </div>
        <div className='comItem'>
          <PieBg />
          <PieCheck />
        </div>
        <div className='comItem'>
          <div className="rightBottom">
            <img src="/shaders1/MiddlePort/shipImg.png" alt="" className="shipImg" />
          </div>
        </div>

        <div className='comItem'>
          <S2CenterMap />
        </div>

        <div className='comItem'>
          <S3CenterMap />
        </div>

        <div className='comItem'>
          <MusicLine />
        </div>
      </div>
    )
  }
}

 export default S1;
