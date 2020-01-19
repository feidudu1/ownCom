/* eslint-disable */
import React from 'react';
import _ from 'lodash';
import './index.less';

export default class FlyingLine extends React.Component {
  componentDidMount() {
    const option = this.props.option;
    const canvas = this.flyingLine;
    const height = canvas.height = option.height;
    const width = canvas.width = option.width;
    const pi = Math.PI;
    const dots = [];
    let count = 0;
    if (canvas.getContext) {
      const context = canvas.getContext('2d');
      const change = [75, 90];
      const changeAng = [0.05, 0.18];
      const rand = (arr) => (Math.random() * (arr[1] - arr[0])) + arr[0];
      const Dot = function d() {
        this.change = rand(change);
        this.x = 0;
        this.y = (Math.random() * 30) + 30;
        this.mx = this.change / 25;
        this.my = (Math.random() * 2) - 1;
        this.rot = Math.random() * pi * 2;
        this.omega = rand(changeAng);
      };
      Dot.prototype.move = function m() {
        this.x += this.mx;
        this.y += this.my;
        this.rot += this.omega;
        context.translate(this.x, this.y);
        context.rotate(this.rot);
        context.fillStyle = '#1ef5fa';
        context.beginPath();
        context.moveTo(0, 0);
        context.arc(1, 1, 2, 0, 2 * pi);
        context.closePath();
        context.fill();
        context.rotate(-this.rot);
        context.translate(-this.x, -this.y);
      };
      const loop = () => {
        requestAnimationFrame(loop);
        context.globalCompositeOperation = 'destination-out';
        context.fillStyle = 'rgba(0, 0, 0, .05)';
        context.fillRect(-1, -1, width + 10, height + 10);
        context.globalCompositeOperation = 'lighter';
        if (Math.random() < 0.07) {
          dots.push(new Dot());
        }
        _.each(dots, (dot) => dot.move());
        count += 1;
        if (count % 500 === 0) {
          context.globalCompositeOperation = 'destination-out';
          context.fillStyle = 'rgb(0, 0, 0)';
          context.fillRect(0, 0, width, height);
        }
      };
      loop();
    }
  }
  render() {
    return (
      <div className="flyingLine">
        <canvas ref={(node) => { this.flyingLine = node; }}></canvas>
      </div>
    );
  }
}

FlyingLine.propTypes = {
  // option: React.PropTypes.object,
};
