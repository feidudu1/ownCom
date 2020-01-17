// import Helmet from 'react-helmet'
// import style from './index.less';
import {Redirect} from 'react-router';
// import { projectName } from '../../../projectConfig.js';
// todo 不存在的页面无法自动跳转到404页面，必须url有404才能跳转到该页面
export default () => (
  <Redirect to="/s3" />
  // <div className={style.nocontent}>
  //   {/* <Helmet>
  //       <title>Page 404 Not Found</title>
  //     </Helmet> */}
  //   <figure>
  //     <a href="http://www.dtdream.com" target="_blank" rel="noopener noreferrer">
  //       <img src="/static/img/logo/dtdream-logo.svg" alt="数梦logo" style={{color: '#1890ff'}} />
  //       {/* <img src={`/${projectName}/static/img/logo/dtdream-logo.svg`} alt="数梦logo"/> */}
  //     </a>
  //     <figcaption className={style.figcaption}>
  //         数据连接梦想
  //       <span className={style.span} />
  //     </figcaption>
  //   </figure>
  // </div>
);
