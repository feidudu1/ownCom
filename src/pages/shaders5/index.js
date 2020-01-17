import {connect} from 'dva';
import V2shadertoy from './components/V2shadertoy';

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
        <V2shadertoy />
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
