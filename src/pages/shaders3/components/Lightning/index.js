/* eslint-disable */
import React from 'react';
import './index.less';

export default class Lightning extends React.Component {
  componentDidMount() {
    const canvas = this.lightningBall;
    const ctx = canvas.getContext('2d');
    const {
      cw,
      ch,
      count,
      startHue,
      startVel,
    } = this.props.option;
    const branches = [];
    const rand = (min, max) => (Math.random() * (max - min)) + min;
    const randInt = (min, max) => Math.floor(min + (Math.random() * ((max - min) + 1)));
    canvas.width = cw;
    canvas.height = ch;
    // let time = 0;
    function Branch(x, y, angle, nextAngle, hue, vel, num1, num2, spread, alpha, linew) {
      this.x = x;
      this.y = y;
      this.points = [];
      this.angle = angle;
      this.nextAngle = nextAngle;
      this.vel = vel;
      this.hue = 200;
      this.life = 1;
      this.decay = 0.02;
      this.dead = false;
      this.alpha = alpha;
      this.linew = linew;

      const l = randInt(num1, num2);
      const a = [];
      this.points.push({
        x: this.x + (Math.cos(this.angle) * (this.vel)),
        y: this.y + (Math.sin(this.angle) * (this.vel)),
      });
      for (let i = 0; i < l; i += 1) {
        const tempAngle = rand(this.angle, this.nextAngle);
        a.push(tempAngle);
      }
      a.sort();
      a.forEach((item) => {
        const v = this.vel + rand(-3, 3);
        this.points.push({
          x: this.x + (Math.cos(item) * v),
          y: this.y + (Math.sin(item) * v),
          vel: v,
          angle: item,
          // spread: Math.pow(0.5, rand(-1, 10)),
          spread: rand(-spread, spread),

        });
      });
      this.points.push({
        x: this.x + (Math.cos(this.nextAngle) * (this.vel)),
        y: this.y + (Math.sin(this.nextAngle) * (this.vel)),
      });
    }
    Branch.prototype.step = function step() {
      this.life -= this.decay;
      if (this.life <= 0) {
        this.dead = true;
        // time += 1;
        // if (time % 100 === 0) {
        //   ctx.globalCompositeOperation = 'destination-out';
        //   ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        //   ctx.fillRect(0, 0, cw, ch);
        // }
        reset();
      }
      if (!this.dead) {
        for (let i = 1; i < this.points.length - 1; i += 1) {
          this.points[i].vel += this.points[i].spread;
          this.points[i].x = this.x + (Math.cos(this.points[i].angle + rand(-0.03, 0.03)) * this.points[i].vel);
          this.points[i].y = this.y + (Math.sin(this.points[i].angle + rand(-0.03, 0.03)) * this.points[i].vel);
        }
      }
    };

    Branch.prototype.draw = function draw() {
      for (let i = 0; i < this.points.length - 1; i += 1) {
        ctx.beginPath();
        ctx.moveTo(this.points[i].x, this.points[i].y);
        ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
        ctx.strokeStyle = `hsla(${this.hue}, 70%, 40%, ${this.alpha})`;
        ctx.lineWidth = this.linew;
        ctx.stroke();
      }
    };

    const reset = () => {
      const cx = cw / 2;
      const cy = ch / 2;
      branches.length = 0;
      const angle = [];
      for (let i = 0; i <= count; i += 1) {
        angle.push(((Math.PI * 2) / count) * i);
      }
      for (let j = 0; j < count; j += 1) {
        branches.push(new Branch(cx, cy, angle[j], angle[j + 1], startHue, 185, 5, 20, 0.2, 0.5, 0.5));
      }
      for (let j = 0; j < count; j += 1) {
        branches.push(new Branch(cx, cy, angle[j], angle[j + 1], startHue, startVel, 5, 20, 0.2, 0.5, 0.5));
      }
      for (let j = 0; j < count; j += 1) {
        branches.push(new Branch(cx, cy, angle[j], angle[j + 1], startHue, 175, 5, 20, 0.2, 0.5, 0.3));
      }
      for (let j = 0; j < count; j += 1) {
        branches.push(new Branch(cx, cy, angle[j], angle[j + 1], startHue, 170, 5, 20, 0.2, 0.5, 0.2));
      }
      for (let j = 0; j < count; j += 1) {
        branches.push(new Branch(cx, cy, angle[j], angle[j + 1], startHue, 190, 5, 10, 0.3, 0.15, 1));
      }
    };

    const step = () => {
      let i = branches.length;
      while (i > 0) {
        i -= 1;
        branches[i].step();
      }
    };

    const draw = () => {
      let i = branches.length;
      ctx.globalCompositeOperation = 'lighter';
      while (i > 0) {
        i -= 1;
        branches[i].draw();
      }
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, cw, ch);
    };

    const loop = () => {
      requestAnimationFrame(loop);
      step();
      draw();
    };

    reset();
    loop();
  }
  render() {
    return (
      <div className="lightning">
        <canvas ref={(node) => { this.lightningBall = node; }}></canvas>
      </div>
    );
  }
}

Lightning.propTypes = {
  // option: React.PropTypes.object,
};
