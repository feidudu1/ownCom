import {Redirect} from 'react-router';
import Link from 'umi/link';

const shaders1 = '/shaders1'
const shaders2 = '/shaders2'
// const shaders3 = '/shaders3'
// const shaders4 = '/shaders4'
// const shaders5 = '/shaders5'
// const shaders6 = '/shaders6'
// const shaders7 = '/shaders7'
// const shaders8 = '/shaders8'
// const shaders9 = '/shaders9'

export default () => (
  <div>
    {/* <Redirect to="/s1" /> */ }
    <ol>
      <li>
        <Link to={shaders1}>pujiang_bianjian</Link>
      </li>
      <li>
        <Link to={shaders2}>tongnan_ningmeng</Link>
      </li>
      {/* <li>
        <Link to={shaders3}>从toy到webgl：钻石，只成功了shader文件，另一个textureLod搞不定</Link>
      </li>
      <li>
        <Link to={shaders4}>从toy到webgl：假钻石，连形状都是shander画的，不能作为材质。因为shader没有tDiffuse值映射到几何形体上，所以是一片的shader的样子</Link>
      </li>
      <li>
        <Link to={shaders5}>从toy到webgl：整个画面作为材质</Link>
      </li>
      <li>
        <Link to={shaders6}>从toy到webgl：毛玻璃材质，但是看不出来，可以放到钻石上试试</Link>
      </li>
      <li>
        <Link to={shaders7}>从toy到webgl：印花玻璃，不太好看</Link>
      </li>
      <li>
        <Link to={shaders8}>从toy到webgl，用了钻石模型：太夸张了，不好看，</Link>
      </li>
      <li>
        <Link to={shaders9}>从toy到webgl：太夸张了，不好看</Link>
      </li> */}
    </ol>
    
    
  </div>
);
