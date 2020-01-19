/* eslint-disable */
import React from 'react';
import './index.styl';

class WEnergyBarCanvas extends React.Component {
  componentDidMount() {
    const { width, height, startAng, arcNum, rangeAng, arcRange, gapRange, direction, radius, lineW, circleX, circleY, color1, color2 } = this.props.option;
    // 弧变化的方向
    let op = 1;
    if (direction === false) {
      op = 1;
    } else {
      op = -1;
    }
    // 每一份的角度
    const unit = (rangeAng / ((arcRange * arcNum) + (gapRange * (arcNum - 1)))) * op;
    const canvas = this.canvas;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    // const unit = pi / 213;
    let count = 0;
    let update = 1;
    let color = color2;
    let num = 0;
    const draw = () => {
      for (let i = 0; i < 18; i += 1) {
        if (i <= count) {
          color = color1;
        } else {
          color = color2;
        }
        ctx.lineWidth = lineW;
        const start = startAng + (i * (arcRange + gapRange) * unit);
        const diff = arcRange * unit;
        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, start, start + diff, direction);
        // ctx.arc((width / 2) - 5, (height / 2) + 4, radius, start, start + diff, direction);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
      }
    };
    const loop = () => {
      requestAnimationFrame(loop);
      if (num === 6) {
        if (count === 0) {
          update = 1;
        } else if (count === (arcNum - 1)) {
          update = -1;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        count += update;
        num = 0;
      }
      num += 1;
    };
    loop();
  }
  render() {
    return (
      <canvas className="wEnergyBarCanvas" ref={(node) => { this.canvas = node; }}> </canvas>
    );
  }
}
WEnergyBarCanvas.propTypes = {
  // option: React.PropTypes.object,
};

export default WEnergyBarCanvas;
