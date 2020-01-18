import d3 from 'd3';

function render(eleContainer, data, options = {}) {
  const {
    width = 1320,
    height = 300,
  } = options || {};

  const mainColor = '#00C9FF';

  d3.select(eleContainer).select('svg').remove();

  const svg = d3.select(eleContainer)
    .append('svg')
    .attr({
      width,
      height,
    });

   // 渐变
  const defs = svg.append('defs');
  const defs2 = svg.append('defs');
  const linearGradientFill = [{
    offset: '0%',
    color: mainColor,
    opacity: 1,
  },
  {
    offset: '44.1115921%',
    color: mainColor,
    opacity: 1,
  },
  {
    offset: '87.8695101%',
    color: mainColor,
    opacity: 0.318536932,
  },
  {
    offset: '100%',
    color: mainColor,
    opacity: 0,
  },
  ];
  const linearGradientStroke = [{
    offset: '0%',
    color: mainColor,
    opacity: 1,
  },
  {
    offset: '13.7721706%',
    color: mainColor,
    opacity: 1,
  },
  {
    offset: '30.9834248%',
    color: mainColor,
    opacity: 1,
  },
  {
    offset: '44.1115921%',
    color: mainColor,
    opacity: 1,
  },
  {
    offset: '87.4419341%',
    color: mainColor,
    opacity: 0.199765079,
  },
  {
    offset: '100%',
    color: mainColor,
    opacity: 0,
  },
  ];
  defs.append('radialGradient')
     .attr({
       id: 'linearFill',
       cx: '51.9569216%',
       cy: '47.7755998%',
       fx: '51.9569216%',
       fy: '47.7755998%',
       r: '216.758361%',
       gradientTransform: 'translate(0.519569,0.477756),scale(0.222053,1.000000),rotate(180.000000),scale(1.000000,0.415131),translate(-0.519569,-0.477756)',
     })
     .selectAll('stop')
     .data(linearGradientFill)
     .enter()
     .append('stop')
     .attr({
       offset: (d) => d.offset,
       'stop-color': (d) => d.color,
       'stop-opacity': (d) => d.opacity,
     });
  defs.append('radialGradient')
     .attr({
       id: 'linearStroke',
       cx: '51.893403%',
       cy: '47.7755998%',
       fx: '51.893403%',
       fy: '47.7755998%',
       r: '216.47231%',
       gradientTransform: 'translate(0.518934,0.477756),scale(0.222053,1.000000),rotate(180.000000),scale(1.000000,0.415131),translate(-0.518934,-0.477756)',
     })
     .selectAll('stop')
     .data(linearGradientStroke)
     .enter()
     .append('stop')
     .attr({
       offset: (d) => d.offset,
       'stop-color': (d) => d.color,
       'stop-opacity': (d) => d.opacity,
     });

  defs2.append('radialGradient')
     .attr({
       id: 'linearFill2',
       cx: '51.9569216%',
       cy: '47.7755998%',
       fx: '51.9569216%',
       fy: '47.7755998%',
       r: '216.758361%',
       gradientTransform: 'translate(0.519569,0.477756),scale(0.222053,1.000000),rotate(180.000000),scale(1.000000,0.415131),translate(-0.519569,-0.477756)',
     })
     .selectAll('stop')
     .data(linearGradientFill)
     .enter()
     .append('stop')
     .attr({
       offset: (d) => d.offset,
       'stop-color': (d) => d.color,
       'stop-opacity': (d) => d.opacity,
     });
  defs2.append('radialGradient')
     .attr({
       id: 'linearStroke2',
       cx: '51.893403%',
       cy: '47.7755998%',
       fx: '51.893403%',
       fy: '47.7755998%',
       r: '216.47231%',
       gradientTransform: 'translate(0.518934,0.477756),scale(0.222053,1.000000),rotate(180.000000),scale(1.000000,0.415131),translate(-0.518934,-0.477756)',
     })
     .selectAll('stop')
     .data(linearGradientStroke)
     .enter()
     .append('stop')
     .attr({
       offset: (d) => d.offset,
       'stop-color': (d) => d.color,
       'stop-opacity': (d) => d.opacity,
     });

  defs.append('clipPath')
    .attr({
      id: 'se-transition1',
    })
    .append('rect')
    .attr({
      x: width / 2,
      y: 0,
      width: 0,
      height: height + 10,
    })
    .transition()
    .ease('linear')
    .duration(2000)
    .attr({
      x: 0,
      width: width / 2,
    });
  defs.append('clipPath')
    .attr({
      id: 'se-transition2',
    })
    .append('rect')
    .attr({
      x: width / 2,
      y: 0,
      width: 0,
      height: height + 10,
    })
    .transition()
    .ease('linear')
    .duration(2000)
    .attr({
      width: width / 2,
    });

  const bgLeftGroup = svg.append('g')
    .attr({
      class: 'svg-left',
      fill: 'url(#linearFill)',
      stroke: 'url(#linearStroke)',
      'fill-opacity': 0.2,
      'stroke-width': 2,
    });

  const bgRgihtGroup = svg.append('g')
    .attr({
      class: 'svg-right',
      fill: 'url(#linearFill2)',
      stroke: 'url(#linearStroke2)',
      'fill-opacity': 0.2,
      'stroke-width': 2,
      transform: 'translate(28, 2)',
    });

  bgLeftGroup.append('path')
    .attr({
      'clip-path': 'url(#se-transition1)',
      d: 'M597.852255,23.247619 L1,23.247619 L1,122.752381 L533.265449,122.752381 C539.794332,81.8714393 563.445122,45.853295 597.852255,23.247619 Z M533.494369,170.638095 L1,170.638095 L1,270.142857 L600.008696,270.142857 C564.875307,247.922325 540.481716,211.831547 533.494396,170.638095 Z',
    });
  bgRgihtGroup.append('path')
    .attr({
      'clip-path': 'url(#se-transition2)',
      d: 'M815.536425,89.3809524 L1314,89.3809524 L1314,1 L703.584236,1 C753.690744,9.30154535 796.027048,42.905111 815.536322,89.3809521 Z M699.724761,1 L699.473764,1 L699.123979,0.600782293 L699.361713,0.363048205 C699.482771,0.379522599 699.603787,0.396144219 699.724761,0.412912894 L699.724761,1 Z M820.100588,190.190476 L1314,190.190476 L1314,101.809524 L820.100588,101.809523 C824.584618,115.982744 826.892667,130.836629 826.892667,146 C826.892667,161.16337 824.584618,176.017256 820.100587,190.190476 Z M703.584236,291 L1314,291 L1314,202.619048 L815.536424,202.61905 C796.027047,249.09489 753.690744,282.698455 703.584231,291 Z',
    });
}

export default render;
