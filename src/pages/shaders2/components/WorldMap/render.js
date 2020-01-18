import d3 from 'd3';

let timer = null;
const render = (containerId, data, data2, option, canvasId, chooseNum) => {
  const {
    width,
    height,
    color = '#FFCE00',
    canvas = canvasId,
  } = option || {};
  // 移除之前的svg
  const remove = () => {
    d3.select(containerId).select('svg').remove();
  };
  remove();
  // 创建svg
  const svg = d3.select(containerId)
                .append('svg')
                .attr({
                  width,
                  height,
                });
  // 处理数据
  const cPositions = [[409, 90]];
  if (data.length > 0) {
    data.forEach((d) => {
      cPositions.push([
        d.x,
        d.y,
      ]);
    });
  }
  const cPositions2 = [
    [239, 60], // 法国
    [274, 66], // 罗马尼亚
    [132, 172], // 巴西
    [290, 98], // 埃及 --开罗
    [112, 75], // 美国 ---纽约
    [249, 35], // 北欧--- 挪威 奥斯陆
  ];
  const cPositions3 = [
    [36, 100], // 美国加州洛杉矶
    [444, 99], // 上海
    [112, 62], // 加拿大 渥太华
    [255, 52], // 德国
    [132, 172], // 巴西
    [70, 122], // 危地马拉
  ];
  const dataAll = [cPositions, cPositions2, cPositions3];
  // const cPositions = [
  //   [409, 90],
  //   [253, 53],
  //   [442, 152],
  //   [452, 128],
  //   [417, 123],
  //   [300, 94],
  //   [340, 62],
  // ];
  // 计算控制点
  function getControlPoint(point1, point2) {
    // 中点坐标
    const middleX = (point1[0] + point2[0]) / 2;
    const middleY = (point1[1] + point2[1]) / 2;

    const PI = Math.PI / 180;
    // 控制点坐标1
    const x1 = ((point1[0] * Math.cos(60 * PI)) + (middleX * Math.cos(30 * PI)) + (middleY - point1[1])) / (Math.cos(30 * PI) + Math.cos(60 * PI));
    const y1 = ((point1[1] * Math.cos(60 * PI)) + (middleY * Math.cos(30 * PI)) + (point1[0] - middleX)) / (Math.cos(30 * PI) + Math.cos(60 * PI));
    // 控制点坐标2
    const x2 = ((point2[0] * Math.cos(60 * PI)) + (middleX * Math.cos(30 * PI)) + (middleY - point2[1])) / (Math.cos(30 * PI) + Math.cos(60 * PI));
    const y2 = ((point2[1] * Math.cos(60 * PI)) + (middleY * Math.cos(30 * PI)) + (point2[0] - middleX)) / (Math.cos(30 * PI) + Math.cos(60 * PI));
    const ControlPoint1 = { x: x1, y: y1 };
    const ControlPoint2 = { x: x2, y: y2 };
    const middlePoints = { x: middleX, y: middleY };
    const points = { ControlPoint1, ControlPoint2, middlePoints };
    return points;
  }
  /*
  * Russia [253, 53]
  * Indonesia [442, 152]
  * Philippines [452, 128]
  * Thailand [417, 123]
  * Jordan [300, 94]
  * kazakhstan [340, 62]
  */
  if (data.length > 0) {
    const cG = svg.selectAll('.cG')
      .data(dataAll[chooseNum])
      .enter()
      .append('g')
      .attr({
        class: 'cG',
      });
    cG.append('circle')
      .attr({
        cx: (d) => d[0],
        cy: (d) => d[1],
        r: 2,
        fill: color,
        stroke: 'none',
      });
    cG.append('circle')
      .attr({
        class: 'bigC',
        cx: (d) => d[0],
        cy: (d) => d[1],
        r: 4,
        fill: 'none',
        stroke: color,
        'stroke-dasharray': 4,
      })
      .style({
        'transform-origin': (d) => `${d[0]}px ${d[1]}px`,
      });
    svg.append('line')
      .attr({
        x1: dataAll[chooseNum][0][0],
        x2: dataAll[chooseNum][0][0],
        y1: dataAll[chooseNum][0][1],
        y2: dataAll[chooseNum][0][1],
        stroke: color,
      })
      .transition()
      .duration(2000)
      .attr({
        x2: dataAll[chooseNum][0][0] + 99,
      });
    svg.append('line')
      .attr({
        x1: dataAll[chooseNum][0][0] + 99,
        x2: dataAll[chooseNum][0][0] + 99,
        y1: dataAll[chooseNum][0][1] - 2,
        y2: dataAll[chooseNum][0][1] - 2,
        stroke: color,
      })
      .transition()
      .duration(2000)
      .attr({
        x2: dataAll[chooseNum][0][0] + 73,
      });
    svg.append('text')
      .attr({
        x: dataAll[chooseNum][0][0] + 74,
        y: dataAll[chooseNum][0][1] - 6,
        'font-size': 10,
        fill: '#fff',
        'text-anchor': 'end',
        opacity: 0,
      })
      .text(`${data2[chooseNum].x}`)
      .transition()
      .duration(1000)
      .delay(2000)
      .attr({
        opacity: 1,
      });
    svg.append('text')
      .attr({
        x: dataAll[chooseNum][0][0] + 99,
        y: dataAll[chooseNum][0][1] - 6,
        'font-size': 10,
        fill: '#fff',
        'text-anchor': 'end',
        opacity: 0,
      })
      .text(`0${data2[chooseNum].z}`)
      .transition()
      .duration(1000)
      .delay(2000)
      .attr({
        opacity: 1,
      })
      .tween('text', () => {
        const i = d3.interpolate(0, data2[chooseNum].y);
        function count(t) {
          let content = 0;
          if (t === 1) {
            content = data2[chooseNum].y;
          } else {
            content = Math.round(i(t));
          }
          this.textContent = `${content}%`;
        }
        return count;
      });
    // const paths = [];
    // for (let i = 0; i < cPositions.length - 1; i += 1) {
    //   paths.push(`
    //     M${cPositions[0][0]}, ${cPositions[0][1]}
    //     C${getControlPoint(cPositions[0], cPositions[i + 1])[0].x}, ${getControlPoint(cPositions[0], cPositions[i + 1])[0].y}
    //     ${getControlPoint(cPositions[0], cPositions[i + 1])[1].x}, ${getControlPoint(cPositions[0], cPositions[i + 1])[1].y}
    //     ${cPositions[i + 1][0]}, ${cPositions[i + 1][1]}
    //   `);
    // }
    // const len = paths.length || 0;
    // for (let i = 0; i < len; i += 1) {
    //   for (let j = 0; j < 100; j += 1) {
    //     const circle = svg.append('circle');
    //     circle.transition()
    //         .attr('cx', 0)
    //         .attr('cy', 0)
    //         .attr('r', 1 - (j * 0.01))
    //         .attr('fill', color)
    //         .attr('opacity', 1 - (j * (1 / 100)));
    //     circle.append('animateMotion')
    //       .attr('path', paths[i])
    //       .attr('begin', `${0.01 + (j / 40)}s`)
    //       .attr('dur', '2s')
    //       .attr('rotate', 'auto')
    //       .attr('repeatCount', 'indefinite');
    //   }
    // }

    // canvas绘制
    const points = [];
    for (let i = 1; i < dataAll[chooseNum].length; i += 1) {
      points.push(getControlPoint(dataAll[chooseNum][0], dataAll[chooseNum][i]));
    }

    let start = 0;
    let start2 = 350;
    let start3 = 350;
    let start4 = 600;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    // 主产地重庆
    const createFlyLines1 = () => {
      points.forEach((d, i) => {
        if (cPositions[i + 1][0] >= 409) {
          ctx.beginPath();

          ctx.moveTo(409, 90);
          ctx.quadraticCurveTo(d.ControlPoint1.x, d.ControlPoint1.y, d.middlePoints.x, d.middlePoints.y);
          ctx.quadraticCurveTo(d.ControlPoint2.x, d.ControlPoint2.y, cPositions[i + 1][0], cPositions[i + 1][1]);

          const grd = ctx.createLinearGradient(start + 250, 90, start + 300, cPositions[i + 1][1]);
          grd.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grd.addColorStop(0.5, color);
          grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.lineWidth = 2;
          ctx.strokeStyle = grd;
          ctx.stroke();

          ctx.closePath();
        } else {
          ctx.beginPath();

          ctx.moveTo(409, 90);
          ctx.quadraticCurveTo(d.ControlPoint1.x, d.ControlPoint1.y, d.middlePoints.x, d.middlePoints.y);
          ctx.quadraticCurveTo(d.ControlPoint2.x, d.ControlPoint2.y, cPositions[i + 1][0], cPositions[i + 1][1]);

          const grd = ctx.createLinearGradient(start2 + 150, 90, start2 + 250, cPositions[i + 1][1]);
          grd.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grd.addColorStop(0.4, color);
          grd.addColorStop(0.5, color);
          grd.addColorStop(0.6, color);
          grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.lineWidth = 2;
          ctx.strokeStyle = grd;
          ctx.stroke();

          ctx.closePath();
        }
      });

      if (start >= 250) {
        start = 0;
      } else {
        start += 1;
      }
      if (start2 <= 0) {
        start2 = 350;
      } else {
        start2 -= 1;
      }
    };
    // 主产地法国
    const createFlyLines2 = () => {
      points.forEach((d, i) => {
        if (cPositions2[i + 1][0] >= 239) {
          ctx.beginPath();

          ctx.moveTo(239, 60);
          ctx.quadraticCurveTo(d.ControlPoint1.x, d.ControlPoint1.y, d.middlePoints.x, d.middlePoints.y);
          ctx.quadraticCurveTo(d.ControlPoint2.x, d.ControlPoint2.y, cPositions2[i + 1][0], cPositions2[i + 1][1]);

          const grd = ctx.createLinearGradient(start + 150, 60, start + 200, cPositions2[i + 1][1]);
          grd.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grd.addColorStop(0.5, color);
          grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.lineWidth = 2;
          ctx.strokeStyle = grd;
          ctx.stroke();

          ctx.closePath();
        } else if (cPositions2[i + 1][1] >= 120) {
          ctx.beginPath();

          ctx.moveTo(239, 60);
          ctx.quadraticCurveTo(d.ControlPoint1.x, d.ControlPoint1.y, d.middlePoints.x, d.middlePoints.y);
          ctx.quadraticCurveTo(d.ControlPoint2.x, d.ControlPoint2.y, cPositions2[i + 1][0], cPositions2[i + 1][1]);

          const grd = ctx.createLinearGradient(start2, 160, start2 + 100, cPositions2[i + 1][1]);
          grd.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grd.addColorStop(0.4, color);
          grd.addColorStop(0.5, color);
          grd.addColorStop(0.6, color);
          grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.lineWidth = 2;
          ctx.strokeStyle = grd;
          ctx.stroke();

          ctx.closePath();
        } else {
          ctx.beginPath();

          ctx.moveTo(239, 60);
          ctx.quadraticCurveTo(d.ControlPoint1.x, d.ControlPoint1.y, d.middlePoints.x, d.middlePoints.y);
          ctx.quadraticCurveTo(d.ControlPoint2.x, d.ControlPoint2.y, cPositions2[i + 1][0], cPositions2[i + 1][1]);

          const grd = ctx.createLinearGradient(start2, 60, start2 + 100, cPositions2[i + 1][1]);
          grd.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grd.addColorStop(0.4, color);
          grd.addColorStop(0.5, color);
          grd.addColorStop(0.6, color);
          grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.lineWidth = 2;
          ctx.strokeStyle = grd;
          ctx.stroke();

          ctx.closePath();
        }
      });

      if (start >= 250) {
        start = 0;
      } else {
        start += 1;
      }
      if (start2 <= 0) {
        start2 = 350;
      } else {
        start2 -= 1;
      }
    };
    // 主产地纽约

    const createFlyLines3 = () => {
      points.forEach((d, i) => {
        if (cPositions3[i + 1][0] >= 70 && cPositions3[i + 1][0] < 120) {
          ctx.beginPath();

          ctx.moveTo(36, 100);
          ctx.quadraticCurveTo(d.ControlPoint1.x, d.ControlPoint1.y, d.middlePoints.x, d.middlePoints.y);
          ctx.quadraticCurveTo(d.ControlPoint2.x, d.ControlPoint2.y, cPositions3[i + 1][0], cPositions3[i + 1][1]);

          const grd = ctx.createLinearGradient(start - 100, 100, start - 50, cPositions3[i + 1][1]);
          grd.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grd.addColorStop(0.5, color);
          grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.lineWidth = 2;
          ctx.strokeStyle = grd;
          ctx.stroke();

          ctx.closePath();
        } else if (cPositions3[i + 1][0] >= 120 && cPositions3[i + 1][0] < 220) {
          ctx.beginPath();

          ctx.moveTo(36, 100);
          ctx.quadraticCurveTo(d.ControlPoint1.x, d.ControlPoint1.y, d.middlePoints.x, d.middlePoints.y);
          ctx.quadraticCurveTo(d.ControlPoint2.x, d.ControlPoint2.y, cPositions3[i + 1][0], cPositions3[i + 1][1]);

          const grd = ctx.createLinearGradient(start - 100, 120, start - 0, cPositions3[i + 1][1]);
          grd.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grd.addColorStop(0.5, color);
          grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.lineWidth = 2;
          ctx.strokeStyle = grd;
          ctx.stroke();

          ctx.closePath();
        } else if (cPositions3[i + 1][0] >= 220 && cPositions3[i + 1][0] < 320) {
          ctx.beginPath();

          ctx.moveTo(36, 100);
          ctx.quadraticCurveTo(d.ControlPoint1.x, d.ControlPoint1.y, d.middlePoints.x, d.middlePoints.y);
          ctx.quadraticCurveTo(d.ControlPoint2.x, d.ControlPoint2.y, cPositions3[i + 1][0], cPositions3[i + 1][1]);

          const grd = ctx.createLinearGradient(start3 - 50, 100, start3 + 50, cPositions3[i + 1][1]);
          grd.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grd.addColorStop(0.5, color);
          grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.lineWidth = 2;
          ctx.strokeStyle = grd;
          ctx.stroke();

          ctx.closePath();
        } else if (cPositions3[i + 1][0] >= 320) {
          ctx.beginPath();

          ctx.moveTo(36, 100);
          ctx.quadraticCurveTo(d.ControlPoint1.x, d.ControlPoint1.y, d.middlePoints.x, d.middlePoints.y);
          ctx.quadraticCurveTo(d.ControlPoint2.x, d.ControlPoint2.y, cPositions3[i + 1][0], cPositions3[i + 1][1]);

          const grd = ctx.createLinearGradient(start4 - 150, 100, start4 + 50, cPositions3[i + 1][1]);
          grd.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grd.addColorStop(0.5, color);
          grd.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.lineWidth = 2;
          ctx.strokeStyle = grd;
          ctx.stroke();

          ctx.closePath();
        }
      });

      if (start >= 250) {
        start = 0;
      } else {
        start += 1;
      }
      if (start2 <= 0) {
        start2 = 350;
      } else {
        start2 -= 1;
      }
      if (start3 >= 350) {
        start3 = 0;
      } else {
        start3 += 1;
      }
      if (start4 >= 600) {
        start4 = 0;
      } else {
        start4 += 2;
      }
    };
    const animation = () => {
      timer = requestAnimationFrame(animation);
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
      }
      switch (chooseNum) {
        case 0:
          createFlyLines1();
          break;
        case 1:
          createFlyLines2();
          break;
        default:
          createFlyLines3();
          break;
      }
    };
    if (timer) {
      cancelAnimationFrame(timer);
      timer = null;
    }
    animation();
  }
};
export default render;
