import {connect} from 'dva';
import EarthMap from './components/EarthMap';
import WorldMap from './components/WorldMap';
import LeftTopCarouselImg from './components/LeftTopCarouselImg';
import SlideShow from './components/SlideShow';
import LeftWordCloud from './components/LeftWordCloud';

import {
  Component,
} from 'react';

import style from './index.less';

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
      <div className={style.main}>
        <div className='comItem'>
          <EarthMap />
        </div>
        <div className='comItem'>
          <WorldMap />
        </div>
        <div className='comItem'>
          <LeftTopCarouselImg />
        </div>
        <div className='comItem'>
          <SlideShow />
        </div>
        <div className='comItem'>
          <LeftWordCloud />
        </div>
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
