/* eslint-disable */
import d3 from 'd3';

function render(eleContainer, data, options = {}) {
  data = [
    {
      department: '杭州海关1',
      number: 200,
    },
    {
      department: '作物2',
      number: 180,
    },
    {
      department: '作物3',
      number: 160,
    },
    {
      department: '作物4',
      number: 140,
    },
    {
      department: '作物5',
      number: 120,
    },
  ];
  const {
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    width = 330,
    height = 335,
  } = options || {};

  const cw = width - paddingLeft - paddingRight;
  const ch = height - paddingTop - paddingBottom;
  const cr = Math.min(cw, ch) / 2;
  const innerR1 = 0.86 * cr;
  const outerR1 = 0.92 * cr;
  const radius = 0.5 * cr;

  const mainColor = 'rgba(8, 202, 255, 1)';

  d3.select(eleContainer).select('svg').remove();

  const svg = d3.select(eleContainer)
    .append('svg')
    .attr({
      width,
      height,
    });
  svg.append('circle')
     .attr({
       cx: paddingLeft + cw / 2,
       cy: paddingTop + ch / 2,
       r: cr - 20,
       fill: 'none',
       stroke: '#091F36',
       'stroke-width': 35,
       'stroke-opacity': 1,
     });
  const pieGroup = svg.append('g')
    .attr({
      class: 'svg-container',
      transform: `translate(${paddingLeft + cw / 2}, ${paddingTop + ch / 2})`,
    });

  // 最外层圈
  pieGroup.append('circle')
    .attr({
      r: cr - 4,
      stroke: mainColor,
      'stroke-width': 2,
      fill: 'none',
    });

  // 饼图
  const pie = d3.layout.pie()
    .value(({ number }) => number)
    .sort(null);
  const pieData = pie(data);
  pieGroup.selectAll('path.arc-data')
    .data(pieData)
    .enter()
    .append('path')
    .attr({
      d: drawArc(innerR1, outerR1),
      fill: mainColor,
    });

  function drawArc(inner, outer) {
    const arc = d3.svg.arc()
      .innerRadius(inner)
      .outerRadius(outer)
      .startAngle(({
        startAngle,
      }) => startAngle + 0.015)
      .endAngle(({
        endAngle,
      }) => endAngle - 0.015);
    return arc;
  }

  // pieGroup.append('circle')
  //   .attr({
  //     r: 148,
  //     fill: 'red',
  //     // opacity: 0.3
  //   })

}

export default render;
