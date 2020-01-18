import d3 from 'd3';

export default function render(id, data, option, getShowFrame, getShowHigh) {
  const {
    width,
    height,
    color1 = ['#FFD441', '#00E6FF'],
    linearColor1 = ['#FFFAD8', '#FFEB65', '#7C6002'],
    linearColor2 = ['#E2FBFF', '#00D1FF', '#00535C'],
    pathHeight = 37,
    opaT1 = 0.8,
    opaT2 = 0.8,
    opaT3 = 0.8,
    lighs = [false, false, false],
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
  const flyLinePaths = [
    'M300, 210 C220 170 190 210 234 224 L1070, 600 S1175 740 950 886',
    'M300, 205 C220 165 190 205 234 219 L1070, 595 S1190 745 960 891',
  ];
  const flyLinePaths2 = [
    'M970, 898 S1190 745 1430 796 L2060, 1157 C2125 1170 2110 1134 2070 1120',
    'M978, 900 S1190 750 1430 795 L2060, 1152 C2125 1170 2110 1134 2070 1120',
  ];
  // 飞线动效
  for (let i = 0; i < 30; i += 1) {
    const circle = svg.append('circle');
    circle.transition()
      //   .delay((j + 1) * 1000 + i * 200)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 1.5 - (i * 0.02))
      .attr('fill', '#00E6FF')
      .attr('opacity', 1 - (i * (1 / 30)));
    circle.append('animateMotion')
      .attr('path', flyLinePaths[0])
      .attr('begin', `${0.1 + (i / 130)}s`)
      .attr('dur', '5s')
      .attr('rotate', 'auto')
      .attr('repeatCount', 'indefinite');
    const circle2 = svg.append('circle');
    circle2.transition()
      //   .delay((j + 1) * 1000 + i * 200)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 1.5 - (i * 0.02))
      .attr('fill', '#00E6FF')
      .attr('opacity', 1 - (i * (1 / 30)));
    circle2.append('animateMotion')
      .attr('path', flyLinePaths[1])
      .attr('begin', `${0.1 + (i / 260)}s`)
      .attr('dur', '3s')
      .attr('rotate', 'auto')
      .attr('repeatCount', 'indefinite');

    const circle3 = svg.append('circle');
    circle3.transition()
      //   .delay((j + 1) * 1000 + i * 200)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 1.5 - (i * 0.02))
      .attr('fill', '#FF5700')
      .attr('opacity', 1 - (i * (1 / 30)));
    circle3.append('animateMotion')
      .attr('path', flyLinePaths2[0])
      .attr('begin', `${0.1 + (i / 130)}s`)
      .attr('dur', '5s')
      .attr('rotate', 'auto')
      .attr('repeatCount', 'indefinite');
    const circle4 = svg.append('circle');
    circle4.transition()
      //   .delay((j + 1) * 1000 + i * 200)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 1.5 - (i * 0.02))
      .attr('fill', '#FF5700')
      .attr('opacity', 1 - (i * (1 / 30)));
    circle4.append('animateMotion')
      .attr('path', flyLinePaths2[1])
      .attr('begin', `${0.1 + (i / 260)}s`)
      .attr('dur', '3s')
      .attr('rotate', 'auto')
      .attr('repeatCount', 'indefinite');
  }
  for (let i = 0; i < 5; i += 1) {
    const circle = svg.append('circle');
    circle.transition()
      //   .delay((j + 1) * 1000 + i * 200)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 1.5 - (i * 0.02))
      .attr('fill', '#fff')
      .attr('opacity', 1 - (i * (1 / 30)));
    circle.append('animateMotion')
      .attr('path', flyLinePaths[0])
      .attr('begin', `${0.1 + (i / 1000)}s`)
      .attr('dur', '5s')
      .attr('rotate', 'auto')
      .attr('repeatCount', 'indefinite');
    const circle2 = svg.append('circle');
    circle2.transition()
      //   .delay((j + 1) * 1000 + i * 200)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 1.5 - (i * 0.02))
      .attr('fill', '#fff')
      .attr('opacity', 1 - (i * (1 / 30)));
    circle2.append('animateMotion')
      .attr('path', flyLinePaths[1])
      .attr('begin', `${0.1 + (i / 1000)}s`)
      .attr('dur', '3s')
      .attr('rotate', 'auto')
      .attr('repeatCount', 'indefinite');

    const circle3 = svg.append('circle');
    circle3.transition()
      //   .delay((j + 1) * 1000 + i * 200)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 1.5 - (i * 0.02))
      .attr('fill', '#fff')
      .attr('opacity', 1 - (i * (1 / 30)));
    circle3.append('animateMotion')
      .attr('path', flyLinePaths2[0])
      .attr('begin', `${0.1 + (i / 1000)}s`)
      .attr('dur', '5s')
      .attr('rotate', 'auto')
      .attr('repeatCount', 'indefinite');
    const circle4 = svg.append('circle');
    circle4.transition()
      //   .delay((j + 1) * 1000 + i * 200)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 1.5 - (i * 0.02))
      .attr('fill', '#fff')
      .attr('opacity', 1 - (i * (1 / 30)));
    circle4.append('animateMotion')
      .attr('path', flyLinePaths2[1])
      .attr('begin', `${0.1 + (i / 1000)}s`)
      .attr('dur', '3s')
      .attr('rotate', 'auto')
      .attr('repeatCount', 'indefinite');
  }

  const groupT1 = svg.append('g').attr('class', 't1');
  const groupT2 = svg.append('g').attr('class', 't2');
  const groupT3 = svg.append('g').attr('class', 't3');
  const defs = svg.append('defs');
  const fillLinear1 = [
    { offset: '0%', color: linearColor1[0], opacity: 1 },
    { offset: '100%', color: linearColor1[1], opacity: 1 },
  ];
  const fillLinear2 = [
    { offset: '0%', color: linearColor2[0], opacity: 1 },
    { offset: '100%', color: linearColor2[1], opacity: 1 },
  ];
  defs.append('linearGradient')
      .attr({
        id: 'pathColor1',
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '100%',
      })
      .selectAll('stop')
      .data(fillLinear1)
      .enter()
      .append('stop')
      .attr({
        offset: (d) => d.offset,
        'stop-color': (d) => d.color,
        'stop-opacity': (d) => d.opacity,
      });
  defs.append('linearGradient')
      .attr({
        id: 'pathColor2',
        x1: '0',
        y1: '0',
        x2: '0',
        y2: '100%',
      })
      .selectAll('stop')
      .data(fillLinear2)
      .enter()
      .append('stop')
      .attr({
        offset: (d) => d.offset,
        'stop-color': (d) => d.color,
        'stop-opacity': (d) => d.opacity,
      });
  defs.append('linearGradient')
      .attr({
        id: 'pathColor3',
        x1: '60%',
        y1: '0',
        x2: '0%',
        y2: '100%',
      })
      .selectAll('stop')
      .data(fillLinear2)
      .enter()
      .append('stop')
      .attr({
        offset: (d) => d.offset,
        'stop-color': (d) => d.color,
        'stop-opacity': (d) => d.opacity,
      });
  defs.append('linearGradient')
      .attr({
        id: 'pathColor4',
        x1: '60%',
        y1: '0',
        x2: '0%',
        y2: '100%',
      })
      .selectAll('stop')
      .data(fillLinear1)
      .enter()
      .append('stop')
      .attr({
        offset: (d) => d.offset,
        'stop-color': (d) => d.color,
        'stop-opacity': (d) => d.opacity,
      });
  // ************************T1**************************
  const path6T1 = groupT1.append('path');
  const path1T1 = groupT1.append('path');
  const path2T1 = groupT1.append('path');
  const path3T1 = groupT1.append('path');
  const path4T1 = groupT1.append('path');
  const path5T1 = groupT1.append('path');
  path6T1.attr({
    d: `M619, ${305 + pathHeight} L619, ${305 + pathHeight} L638, ${291 + pathHeight} L638, ${291 + pathHeight}Z`,
    fill: 'url(#pathColor2)',
    stroke: 'none',
    opacity: opaT1,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M619, 305 L619, ${305 + pathHeight} L638, ${291 + pathHeight} L638, 291Z`,
  });
  path1T1.attr({
    d: `M511, ${300 + pathHeight} L542, ${314 + pathHeight} L527 ${326 + pathHeight} L790, ${444 + pathHeight} L805, ${433 + pathHeight} L821, ${440 + pathHeight} L839.5, ${426.5 + pathHeight} L834, ${424 + pathHeight} L852, ${410 + pathHeight} L619, ${305 + pathHeight} L638, ${291 + pathHeight} L566, ${259 + pathHeight}Z`,
    fill: color1[1],
    stroke: 'none',
    opacity: opaT1,
  })
  .transition()
  .duration(2000)
  .attr({
    d: 'M511, 300 L542, 314 L527 326 L790, 444 L805, 433 L821, 440 L839.5, 426.5 L834, 424 L852, 410 L619, 305 L638, 291 L566, 259Z',
  });
  path2T1.attr({
    d: `M511, ${300 + pathHeight} L511, ${300 + pathHeight} L527, 344 L527, 363 L790, ${444 + pathHeight} L790, ${444 + pathHeight} L527 363 L542, ${314 + pathHeight}Z`,
    fill: linearColor2[2],
    stroke: 'none',
    opacity: opaT1,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M511, 300 L511, ${300 + pathHeight} L527, 344 L527, 363 L790, ${444 + pathHeight} L790, 444 L527 326 L542, 314Z`,
  });
  path3T1.attr({
    d: `M790, ${444 + pathHeight} L790, ${444 + pathHeight} L805, ${433 + pathHeight} L805, ${433 + pathHeight}Z`,
    fill: 'url(#pathColor2)',
    stroke: 'none',
    opacity: opaT1,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M790, 444 L790, ${444 + pathHeight} L805, ${433 + pathHeight} L805, 433Z`,
  });
  path4T1.attr({
    d: `M805, ${433 + pathHeight} L805, ${433 + pathHeight} L821, ${440 + pathHeight} L821, ${440 + pathHeight}Z`,
    fill: linearColor2[2],
    stroke: 'none',
    opacity: opaT1,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M805, 433 L805, ${433 + pathHeight} L821, ${440 + pathHeight} L821, 440Z`,
  });
  path5T1.attr({
    d: `M821, ${440 + pathHeight} L821, ${440 + pathHeight} L839.5, ${426.5 + pathHeight} L839.5, ${(426.5 + pathHeight) - 7} L852, ${410 + pathHeight} L852, ${410 + pathHeight} L834, ${424 + pathHeight} L839.5, ${426.5 + pathHeight}Z`,
    fill: 'url(#pathColor2)',
    stroke: 'none',
    opacity: opaT1,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M821, 440 L821, ${440 + pathHeight} L839.5, ${426.5 + pathHeight} L839.5, ${(426.5 + pathHeight) - 7} L852, ${410 + pathHeight} L852, 410 L834, 424 L839.5, 426.5Z`,
  });

  // ************************T2**************************
  const path6T2 = groupT2.append('path');
  const path1T2 = groupT2.append('path');
  const path2T2 = groupT2.append('path');
  const path3T2 = groupT2.append('path');
  const path4T2 = groupT2.append('path');
  const path5T2 = groupT2.append('path');
  path6T2.attr({
    d: `M1580, ${831 + pathHeight} L1580, ${831 + pathHeight} L1594, ${839 + pathHeight} L1594, ${839 + pathHeight}Z`,
    fill: linearColor2[2],
    stroke: 'none',
    opacity: opaT2,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M1580, 831 L1580, ${831 + pathHeight} L1594, ${839 + pathHeight} L1594, 839Z`,
  });
  path1T2.attr({
    d: `M1577, ${850 + pathHeight} L1813, ${986 + pathHeight} L1831, ${976 + pathHeight} L1859, ${992 + pathHeight} L1922.5, ${955 + pathHeight} L1725, ${841 + pathHeight} L1704, ${854 + pathHeight} L1629, ${811 + pathHeight} L1607, ${823 + pathHeight} L1600, ${819.5 + pathHeight} L1580, ${831 + pathHeight} L1594, ${839 + pathHeight}Z`,
    fill: color1[1],
    stroke: 'none',
    opacity: opaT2,
  })
  .transition()
  .duration(2000)
  .attr({
    d: 'M1577, 850 L1813, 986 L1831, 976 L1859, 992 L1922.5, 955 L1725, 841 L1704, 854 L1629, 811 L1607, 823 L1600, 819.5 L1580, 831 L1594, 839Z',
  });
  path2T2.attr({
    d: `M1577, ${850 + pathHeight} L1577, ${850 + pathHeight} L1813, ${986 + pathHeight} L1813, ${986 + pathHeight}Z`,
    fill: linearColor2[2],
    stroke: 'none',
    opacity: opaT2,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M1577, 850 L1577, ${850 + pathHeight} L1813, ${986 + pathHeight} L1813, 986Z`,
  });
  path3T2.attr({
    d: `M1813, ${986 + pathHeight} L1813, ${986 + pathHeight} L1831, ${976 + pathHeight} L1831, ${976 + pathHeight}Z`,
    fill: 'url(#pathColor2)',
    stroke: 'none',
    opacity: opaT2,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M1813, 986 L1813, ${986 + pathHeight} L1831, ${976 + pathHeight} L1831, 976Z`,
  });
  path4T2.attr({
    d: `M1831, ${976 + pathHeight} L1831, ${976 + pathHeight} L1859, ${992 + pathHeight} L1859, ${992 + pathHeight}Z`,
    fill: linearColor2[2],
    stroke: 'none',
    opacity: opaT2,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M1831, 976 L1831, ${976 + pathHeight} L1859, ${992 + pathHeight} L1859, 992Z`,
  });
  path5T2.attr({
    d: `M1859, ${992 + pathHeight} L1859, ${992 + pathHeight} L1922.5, ${955 + pathHeight} L1922.5, ${955 + pathHeight}Z`,
    fill: 'url(#pathColor2)',
    stroke: 'none',
    opacity: opaT2,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M1859, 992 L1859, ${992 + pathHeight} L1922.5, ${955 + pathHeight} L1922.5, 955Z`,
  });
  // ******************国客中心*******************
  const path1T3 = groupT3.append('path');
  const path2T3 = groupT3.append('path');
  path1T3.attr({
    d: `M839, ${1243 + pathHeight} S840 ${1284 + pathHeight} 885 ${1300 + pathHeight} S1075 ${1356 + pathHeight} 1140 ${1333 + pathHeight} L1140 ${1333 + pathHeight} S1152 ${1330 + pathHeight} 1140 ${1323 + pathHeight} S1000 ${1240 + pathHeight} 880 ${1201 + pathHeight} L880 ${1201 + pathHeight} S836 ${1179 + pathHeight} 839 ${1243 + pathHeight}Z`,
    fill: color1[1],
    stroke: 'none',
    opacity: opaT3,
  })
  .transition()
  .duration(2000)
  .attr({
    d: 'M839, 1243 S840 1284 885 1300 S1075 1356 1140 1333 L1140 1333 S1152 1330 1140 1323 S1000 1240 880 1201 L880 1201 S836 1179 839 1243Z',
  });
  path2T3.attr({
    d: `M839, ${1243 + pathHeight} L839, ${1243 + pathHeight} S840 ${1284 + pathHeight} 885 ${1300 + pathHeight} S1075 ${1356 + pathHeight} 1140 ${1330 + pathHeight} L1140 ${1330 + pathHeight} S1148 ${1326 + pathHeight} 1146 ${1325 + pathHeight} L1146 ${1291 + pathHeight + pathHeight} S1147 ${1332 + pathHeight} 1133 ${1335 + pathHeight} L1133 ${1335 + pathHeight} S1070 ${1360 + pathHeight} 885 ${1300 + pathHeight} L885 ${1300 + pathHeight} S843 ${1288 + pathHeight} 839, ${1243 + pathHeight}`,
    fill: 'url(#pathColor3)',
    stroke: 'none',
    opacity: opaT3,
  })
  .transition()
  .duration(2000)
  .attr({
    d: `M839, 1243 L839, ${1243 + pathHeight} S840 ${1284 + pathHeight} 885 ${1300 + pathHeight} S1075 ${1356 + pathHeight} 1140 ${1330 + pathHeight} L1140 ${1330 + pathHeight} S1148 ${1326 + pathHeight} 1146 ${1325 + pathHeight} L1146 ${1291 + pathHeight} S1147 ${1332} 1133 ${1335} L1133 ${1335} S1070 1360 885 1300 L885 1300 S843 ${1288} 839, 1243`,
  });
  groupT1.append('image')
     .attr({
       'xlink:href': '/shaders1/MiddlePort/t1.svg',
       width: 38,
       height: 51,
       x: 670,
       y: 335 + pathHeight,
     })
     .transition()
     .duration(2000)
     .attr({
       y: 335,
     });
  groupT2.append('image')
     .attr({
       'xlink:href': '/shaders1/MiddlePort/t2.svg',
       width: 38,
       height: 51,
       x: 1730,
       y: 865 + pathHeight,
     })
     .transition()
     .duration(2000)
     .attr({
       y: 865,
     });
  groupT3.append('image')
     .attr({
       'xlink:href': '/shaders1/MiddlePort/t3.svg',
       width: 134,
       height: 105,
       x: 920,
       y: 1220 + pathHeight,
     })
     .transition()
     .duration(2000)
     .attr({
       y: 1220,
     });

  // ****************点击事件*****************
  function fillReset1() {
    path1T1.attr('fill', color1[1]);
    path2T1.attr('fill', linearColor2[2]);
    path3T1.attr('fill', 'url(#pathColor2)');
    path4T1.attr('fill', linearColor2[2]);
    path5T1.attr('fill', 'url(#pathColor2)');
    path6T1.attr('fill', 'url(#pathColor2)');
  }
  function fillReset2() {
    path1T2.attr('fill', color1[1]);
    path2T2.attr('fill', linearColor2[2]);
    path3T2.attr('fill', 'url(#pathColor2)');
    path4T2.attr('fill', linearColor2[2]);
    path5T2.attr('fill', 'url(#pathColor2)');
    path6T2.attr('fill', linearColor2[2]);
  }
  function fillReset3() {
    path1T3.attr('fill', color1[1]);
    path2T3.attr('fill', 'url(#pathColor3)');
  }
  groupT1.on('click', () => {
    fillReset2();
    fillReset3();
    lighs[1] = false;
    lighs[2] = false;
    if (!lighs[0]) {
      path1T1.attr('fill', color1[0]);
      path2T1.attr('fill', linearColor1[2]);
      path3T1.attr('fill', 'url(#pathColor1)');
      path4T1.attr('fill', linearColor1[2]);
      path5T1.attr('fill', 'url(#pathColor1)');
      path6T1.attr('fill', 'url(#pathColor1)');
      lighs[0] = true;
    } else {
      fillReset1();
      lighs[0] = false;
    }
    getShowFrame(1);
    getShowHigh(true);
  });
  groupT2.on('click', () => {
    fillReset1();
    fillReset3();
    lighs[0] = false;
    lighs[2] = false;
    if (!lighs[1]) {
      path1T2.attr('fill', color1[0]);
      path2T2.attr('fill', linearColor1[2]);
      path3T2.attr('fill', 'url(#pathColor1)');
      path4T2.attr('fill', linearColor1[2]);
      path5T2.attr('fill', 'url(#pathColor1)');
      path6T2.attr('fill', 'url(#pathColor1)');
      lighs[1] = true;
    } else {
      fillReset2();
      lighs[1] = false;
    }
    getShowFrame(2);
    getShowHigh(true);
  });
  groupT3.on('click', () => {
    fillReset1();
    fillReset2();
    lighs[0] = false;
    lighs[1] = false;
    if (!lighs[2]) {
      path1T3.attr('fill', color1[0]);
      path2T3.attr('fill', 'url(#pathColor4)');
      lighs[2] = true;
    } else {
      fillReset3();
      lighs[2] = false;
    }
    getShowFrame(3);
    getShowHigh(true);
  });
  groupT1.on('mouseover', () => {
    path1T1.attr('fill', color1[0]);
    path2T1.attr('fill', linearColor1[2]);
    path3T1.attr('fill', 'url(#pathColor1)');
    path4T1.attr('fill', linearColor1[2]);
    path5T1.attr('fill', 'url(#pathColor1)');
    path6T1.attr('fill', 'url(#pathColor1)');
  });
  groupT1.on('mouseout', () => {
    fillReset1();
  });
  groupT2.on('mouseover', () => {
    path1T2.attr('fill', color1[0]);
    path2T2.attr('fill', linearColor1[2]);
    path3T2.attr('fill', 'url(#pathColor1)');
    path4T2.attr('fill', linearColor1[2]);
    path5T2.attr('fill', 'url(#pathColor1)');
    path6T2.attr('fill', 'url(#pathColor1)');
  });
  groupT2.on('mouseout', () => {
    fillReset2();
  });
  groupT3.on('mouseover', () => {
    path1T3.attr('fill', color1[0]);
    path2T3.attr('fill', 'url(#pathColor4)');
  });
  groupT3.on('mouseout', () => {
    fillReset3();
  });
  svg.append('image')
    .attr({
      'xlink:href': '/shaders1/MiddlePort/middleTitle.png',
      width: 170,
      height: 127,
      x: 1220,
      y: 580,
    });
}
