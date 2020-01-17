import Link from 'umi/link';
import {connect} from 'dva';
import withRouter from 'umi/withRouter';
import router from 'umi/router';
import {
  Component,
} from 'react';
import style from './index.less';


class BasicLayout extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount () {

  }

  render () {
    return (
      <div className="content">
        {
          this.props.children
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
  };
}

export default connect(mapStateToProps)(BasicLayout);
