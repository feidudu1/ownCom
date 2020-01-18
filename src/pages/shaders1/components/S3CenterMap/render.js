import d3 from 'd3';
import textures from 'textures';

export default function render(id, data1, data2, data3, option) {
  const {
    width,
    height,
  } = option || {};

  // 移除之前的svg
  const remove = () => {
    d3.select(id).select('svg').remove();
  };
  remove();
  // 创建svg
  const svg = d3.select(id)
    .append('svg')
    .attr({
      width,
      height,
    });
  const group1 = svg.selectAll('.group1')
                    .data(data1)
                    .enter()
                    .append('g')
                    .attr('class', 'group1');
  group1.append('image')
        .attr({
          'xlink:href': '/shaders1/mapIcon3.png',
          width: 59,
          height: 116,
          x: (d) => d.y[0],
          y: (d) => d.y[1],
        });
  group1.append('image')
        .attr({
          'xlink:href': '/shaders1/mapIcon2.svg',
          width: 59,
          height: 116,
          x: (d) => d.y[0],
          y: (d) => d.y[1],
        });
  group1.append('ellipse') // 椭圆
        .attr({
          cx: (d) => d.y[0] + 30,
          cy: (d) => d.y[1] + 58,
          rx: 26,
          ry: 19,
          stroke: '#FFD441',
          fill: 'none',
        });
  group1.append('ellipse') // 椭圆
        .attr({
          class: 'ellipseAni',
          cx: (d) => d.y[0] + 30,
          cy: (d) => d.y[1] + 58,
          rx: 26,
          ry: 19,
          stroke: '#FFD441',
          fill: 'none',
        });
  const paths = [];
  data1.forEach((d) => {
    paths.push(`M${d.y[0] + 8}, ${d.y[1] + 69} a26, 19 0 1, 1 1, 1 Z`);
  });
  group1.append('circle')
        .attr({
          cx: 0,
          cy: 0,
          r: 4,
          stroke: 'none',
          fill: '#FFD441',
        })
        .append('animateMotion')
        .attr({
          path: (d, i) => paths[i],
          begin: '0s',
          dur: '9s',
          rotate: 'auto',
          repeatCount: 'indefinite',
        });
  // g1 text
  const texture1 = textures
    .lines()
    .orientation('6/8')
    .size(5)
    .strokeWidth(1.5)
    .stroke('rgba(255, 212, 65, 0.1)')
    .background('rgba(216, 216, 216, 0.1)');
  svg.call(texture1);
  const textPos = [
    [-318, -25],
    [-350, -99],
    [70, -65],
    [70, -104],
    [71, -80],
    [70, -75],
    [-76, -76],
    [60, -49],
    [85, -13],
    [115, 12],
    [-76, -55],
  ];
  group1.append('rect')
        .attr({
          x: (d, i) => d.y[0] + textPos[i][0],
          y: (d, i) => d.y[1] + textPos[i][1],
          width: (d) => (d.x.length * 32) + 20,
          height: 42,
          fill: texture1.url(),
          stroke: '#F5CB23',
        });
  group1.append('rect')
        .attr({
          x: (d, i) => d.y[0] + textPos[i][0],
          y: (d, i) => d.y[1] + textPos[i][1],
          fill: '#F5CB23',
          stroke: 'none',
          width: 6,
          height: 6,
          opacity: 0.7,
        });
  group1.append('rect')
        .attr({
          x: (d, i) => (((d.x.length * 32) + 20) - 6) + d.y[0] + textPos[i][0],
          y: (d, i) => d.y[1] + textPos[i][1],
          fill: '#F5CB23',
          stroke: 'none',
          width: 6,
          height: 6,
          opacity: 0.7,
        });
  group1.append('rect')
        .attr({
          x: (d, i) => d.y[0] + textPos[i][0],
          y: (d, i) => (42 - 6) + d.y[1] + textPos[i][1],
          fill: '#F5CB23',
          stroke: 'none',
          width: 6,
          height: 6,
          opacity: 0.7,
        });
  group1.append('rect')
        .attr({
          x: (d, i) => (((d.x.length * 32) + 20) - 6) + d.y[0] + textPos[i][0],
          y: (d, i) => (42 - 6) + d.y[1] + textPos[i][1],
          fill: '#F5CB23',
          stroke: 'none',
          width: 6,
          height: 6,
          opacity: 0.7,
        });
  // g1 line
  const linePaths = [
    `M${data1[0].y[0] + 30}, ${data1[0].y[1] + 56} L${data1[0].y[0] + 30}, ${data1[0].y[1] + 17} L${data1[0].y[0] - 10}, ${data1[0].y[1] + 17}`,
    `M${data1[1].y[0] + 30}, ${data1[1].y[1] + 56} L${data1[1].y[0] + 30}, ${data1[1].y[1] - 57} L${data1[1].y[0] - 10}, ${data1[1].y[1] - 57}`,
    `M${data1[2].y[0] + 30}, ${data1[2].y[1] + 56} L${data1[2].y[0] + 30}, ${data1[2].y[1] - 26} L${data1[2].y[0] + 70}, ${data1[2].y[1] - 26}`,
    `M${data1[3].y[0] + 30}, ${data1[3].y[1] + 56} L${data1[3].y[0] + 30}, ${data1[3].y[1] - 62} L${data1[3].y[0] + 70}, ${data1[3].y[1] - 62}`,
    `M${data1[4].y[0] + 30}, ${data1[4].y[1] + 56} L${data1[4].y[0] + 30}, ${data1[4].y[1] - 38} L${data1[4].y[0] + 71}, ${data1[4].y[1] - 38}`,
    `M${data1[5].y[0] + 30}, ${data1[5].y[1] + 56} L${data1[5].y[0] + 30}, ${data1[5].y[1] - 33} L${data1[5].y[0] + 70}, ${data1[5].y[1] - 33}`,
    `M${data1[6].y[0] + 30}, ${data1[6].y[1] + 56} L${data1[6].y[0] + 30}, ${data1[6].y[1] - 34}`,
    `M${data1[7].y[0] + 30}, ${data1[7].y[1] + 56} L${data1[7].y[0] + 30}, ${data1[7].y[1] - 7} L${data1[7].y[0] + 60}, ${data1[7].y[1] - 7}`,
    `M${data1[8].y[0] + 30}, ${data1[8].y[1] + 56} L${data1[8].y[0] + 30}, ${data1[8].y[1] + 29} L${data1[8].y[0] + 84}, ${data1[8].y[1] + 29}`,
    `M${data1[9].y[0] + 30}, ${data1[9].y[1] + 56} L${data1[9].y[0] + 30}, ${data1[9].y[1] + 54} L${data1[9].y[0] + 115}, ${data1[9].y[1] + 54}`,
    `M${data1[10].y[0] + 30}, ${data1[10].y[1] + 56} L${data1[10].y[0] + 30}, ${data1[10].y[1] - 13}`,
  ];
  group1.append('path')
        .attr({
          d: (d, i) => linePaths[i],
          stroke: '#F5CB23',
          fill: 'none',
        });
  group1.append('text')
        .attr({
          x: (d, i) => d.y[0] + textPos[i][0] + 10,
          y: (d, i) => d.y[1] + textPos[i][1] + 32,
          'font-size': 32,
          color: '#CCF6FF',
        })
        .text((d) => d.x);
  // g2
  const group2 = svg.selectAll('.group2')
                    .data(data2)
                    .enter()
                    .append('g')
                    .attr('class', 'group2');
  group2.append('ellipse') // 椭圆
        .attr({
          cx: (d) => d.y[0],
          cy: (d) => d.y[1],
          rx: 7,
          ry: 4,
          stroke: 'none',
          fill: '#00E6FF',
        });
  group2.append('image')
        .attr({
          'xlink:href': '/shaders1/mapIcon5.png',
          width: 70,
          height: 60,
          x: (d) => d.y[0] - 35,
          y: (d) => d.y[1] - 29,
        });
  group2.append('ellipse') // 椭圆
        .attr({
          cx: (d) => d.y[0],
          cy: (d) => d.y[1],
          rx: 12,
          ry: 7,
          stroke: '#00C9FF',
          fill: 'none',
        });
  group2.append('ellipse') // 椭圆
        .attr({
          class: 'ellipseAni2',
          cx: (d) => d.y[0],
          cy: (d) => d.y[1],
          rx: 12,
          ry: 7,
          stroke: '#00C9FF',
          fill: 'none',
        });
  group2.append('image')
        .attr({
          class: 'image1',
          'xlink:href': '/shaders1/mapIcon1.svg',
          width: 40,
          height: 31,
          x: (d) => d.y[0] - 20,
          y: (d) => d.y[1] - 32,
        });
  group2.append('text')
        .attr({
          x: (d) => d.y[0] - 30,
          y: (d) => d.y[1] - 0,
          'text-anchor': 'end',
          'font-size': 32,
          color: '#00C9FF',
        })
        .text((d) => d.x);
  // g3
  const group3 = svg.selectAll('.group3')
                    .data(data3)
                    .enter()
                    .append('g')
                    .attr('class', 'group3');
  group3.append('ellipse') // 椭圆
        .attr({
          cx: (d) => d.y[0] + 9,
          cy: (d) => d.y[1] + 15,
          rx: 13,
          ry: 7.5,
          stroke: '#FC2650',
          fill: 'none',
          'stroke-width': 0.5,
        });
  group3.append('ellipse') // 椭圆
        .attr({
          class: 'ellipseAni3',
          cx: (d) => d.y[0] + 9,
          cy: (d) => d.y[1] + 15,
          rx: 13,
          ry: 7.5,
          stroke: '#FC2650',
          fill: 'none',
          'stroke-width': 0.5,
        });
  group3.append('image')
        .attr({
          class: 'image2',
          'xlink:href': '/shaders1/mapIcon6.svg',
          width: 19,
          height: 19,
          x: (d) => d.y[0],
          y: (d) => d.y[1],
        });
  group3.append('text')
        .attr({
          x: (d) => d.y[0] + 20,
          y: (d) => d.y[1] + 15,
          'text-anchor': 'start',
          'font-size': 18,
          color: '#FC2650',
        })
        .text((d) => d.x);
  svg.append('image')
    .attr({
      'xlink:href': '/shaders1/mapIcon7.png',
      width: 110,
      height: 309,
      x: 1787,
      y: 890,
    });
  svg.append('image')
    .attr({
      class: 'image3',
      'xlink:href': '/shaders1/mapIcon4.svg',
      width: 67,
      height: 47,
      x: 1806,
      y: 1010,
    });
  svg.append('text')
     .attr({
       x: 1840,
       y: 994,
       'text-anchor': 'middle',
       'font-size': 48,
       color: '#FF5700',
     })
     .text('吴淞出入境边防检查站');
}
