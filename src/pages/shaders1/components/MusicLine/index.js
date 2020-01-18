import React, { Component } from 'react';
// import { fromJS } from 'immutable';
import './index.less';

export default class MusicLine2 extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    this.li1 = [];
    for (let i = 0; i < 100; i += 1) {
      this.li1.push(<li className={`li2${Math.ceil((Math.random() * 12) / 2)} li2`} key={Math.random() * i}><span className="aniLi2" /></li>);
    }
    return (
      <div className="demoMusic2">
        <div className="music2">
          <ul id="waves2" className="movement2">
            {this.li1}
          </ul>
          <div className="musicState2" />
        </div>
      </div>
    );
  }
}
