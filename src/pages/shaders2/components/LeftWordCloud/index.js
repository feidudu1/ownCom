import React from 'react';
import WordCloud from 'js2wordcloud';
import { fromJS } from 'immutable';

import './index.less';

class LeftWordCloud extends React.Component {
  static propTypes = {
    // mapDataToProps: React.PropTypes.func,
    // dataEntries: React.PropTypes.object,
    // // getEventValue: React.PropTypes.func,
    // ws: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.state = {};
    // const dataList = {
    //   index1: { id: '5d394d958c080704a0762670' },
    // };
    // props.mapDataToProps(() => dataList);
  }
  componentDidMount() {
    this.getWordCloud();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(fromJS(nextProps).equals(fromJS(this.props)) && fromJS(nextState).equals(fromJS(this.state)));
  }
  componentDidUpdate() {
    this.getWordCloud();
  }
  componentWillUnmount() {
  }
  getWordCloud = () => {
    if (this.defaultData.length > 0) {
      const wc = new WordCloud(this.id);
      wc.setOption({
        imageShape: '/shaders2/nmwc.png',
        fontSizeFactor: 0.1, // 当词云值相差太大，可设置此值进字体行大小微调，默认0.1
        maxFontSize: 30, // 最大fontSize，用来控制weightFactor，默认60
        minFontSize: 8,
        backgroundColor: 'rgba(0, 255, 255, 0)',
        fontFamily: 'SourceHanSansCN-Normal',
        tooltip: {
          show: false,
        },
        list: this.defaultData,
        color: (word, weight) => {
          if ((weight % 2) === 0) {
            return Math.random() > 0.5 ? `rgba(255, 206, 0, ${(Math.random() * (0.4 - 1)) + 1})` : `rgba(255, 206, 0, ${(Math.random() * (0.4 - 1)) + 1})`;
          } return Math.random() > 0.5 ? `rgba(0, 121, 251, ${(Math.random() * (0.4 - 1)) + 1})` : `rgba(0, 121, 251, ${(Math.random() * (0.4 - 1)) + 1})`;
        },
        noDataLoadingOption: {
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
      });
    }
  }
  render() {
    this.defaultData = [
      ['柠檬酸', 400],
      ['糖类', 22],
      ['钙', 8],
      ['磷', 8],
      ['铁', 6],
      ['维生素B1', 10],
      ['维生素B2', 6],
      ['维生素C', 10],
      ['烟酸', 20],
      ['有机酸', 12],
      ['化痰止咳', 33],
      ['生津', 11],
      ['健脾', 7],
      ['除老茧', 5],
      ['防治肾结石', 35],
      ['美白', 1],
      ['抗氧化', 7],
      ['预防感冒', 9],
      ['消除皮肤色素沉着', 7],
      ['预防心血管疾病', 1],
      ['柠檬酸', 12],
      ['糖类', 14],
      ['钙', 8],
      ['磷', 6],
      ['铁', 4],
      ['维生素B1', 6],
      ['维生素B2', 4],
      ['维生素C', 2],
      ['烟酸', 6],
      ['有机酸', 8],
      ['化痰止咳', 3],
      ['生津', 1],
      ['健脾', 3],
      ['除老茧', 5],
      ['防治肾结石', 5],
      ['美白', 1],
      ['抗氧化', 7],
      ['预防感冒', 9],
      ['消除皮肤色素沉着', 7],
      ['预防心血管疾病', 1],
      ['糖类', 14],
      ['钙', 8],
      ['磷', 6],
      ['铁', 4],
      ['维生素B1', 6],
      ['维生素B2', 4],
      ['维生素C', 2],
      ['烟酸', 6],
      ['有机酸', 8],
      ['化痰止咳', 3],
      ['生津', 1],
      ['健脾', 3],
      ['除老茧', 5],
      ['防治肾结石', 5],
      ['美白', 1],
      ['抗氧化', 7],
      ['预防感冒', 9],
      ['消除皮肤色素沉着', 7],
      ['预防心血管疾病', 1],
    ];
    return (
      <div className="leftWordCloud">
        <div className="wordCloudBox" ref={(node) => { this.id = node; }}></div>
      </div>
    );
  }
}

export default LeftWordCloud;
