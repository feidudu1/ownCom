import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import d3 from 'd3';
import { CSS2DRenderer, CSS2DObject } from 'three-css2drender';
// import Orbitcontrols from 'three/examples/js/controls/OrbitControls';
import { flyLineVertexShader, flyLineFragmentShader } from './shader';
// import { data3 } from './city';

let renderer = null;
let camera = null;
let scene = null;
let group = null;
let pointG1 = null;
let pointG2 = null;
let pointG3 = null;
// let orbitControls = null;
// let clock = null;
let uniforms = null;
let cOpaSca = null;
let cOpaSca2 = null;
// let sphereUniforms = null;
const arr = [];
let css2DRenderer = null;
// let lineTween1 = null;
// let lineTween2 = null;
// let lineTween3 = null;
// let lineTween1Un = null;
// let lineTween2Un = null;
// let lineTween3Un = null;
let show = false;
let render1;

export default function earthRender(id, threeDiv, data1, circleData, rectBarData, data3, option) {
  const {
    w = 1920,
    h = 1080,
  } = option || {};
  // 清除几何函数
  function clearThree(obj) {
    while (obj.children && obj.children.length > 0) {
      clearThree(obj.children[0]);
      obj.remove(obj.children[0]);
    }
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) obj.material.dispose();
    if (obj.texture) obj.texture.dispose();
  }

  const isShows = [];
  const textArr = [];
  const pointPosition = [];
  const pointPosition2 = [];
  const animations = [];
  // 创建场景
  function getThree() {
    renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true,
      alpha: true,
      antialias: true,
      canvas: id,
    });
    renderer.setClearColor('#fff');
    renderer.setClearAlpha(0);
    renderer.setSize(w, h);
    scene = new THREE.Scene();
    scene.renderOrder = 1;
    // const fog = new THREE.Fog();
    // fog.color = new THREE.Color(0x001C52);

    camera = new THREE.PerspectiveCamera(48, w / h, 1, 10000);

    group = new THREE.Group();
    scene.add(group);
    pointG1 = new THREE.Group();
    pointG2 = new THREE.Group();
    pointG3 = new THREE.Group();
    scene.add(pointG1);
    scene.add(pointG2);
    scene.add(pointG3);

    css2DRenderer = new CSS2DRenderer();
    css2DRenderer.setSize(w, h);
    css2DRenderer.domElement.style.position = 'absolute';
    css2DRenderer.domElement.style.top = 0;

    // 定义控制器
    // orbitControls = new Orbitcontrols(camera);
    // // 右键是否移动
    // orbitControls.enablePan = false;
    // // 是否可旋转，旋转速度
    // orbitControls.enableRotate = true;
    // orbitControls.rotateSpeed = 0.25;
    // // 是否可以缩放
    // orbitControls.enableZoom = false;
    // // 使动画循环使用时阻尼或自转,意思是否有惯性
    // orbitControls.enableDamping = true;
    // orbitControls.dampingFactor = 0.2;
    // clock = new THREE.Clock();

    const lighting = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(lighting);
    const pointlight = new THREE.DirectionalLight('white', 0.4);
    pointlight.position.set(200, 200, 200).normalize();
    scene.add(pointlight);
  }
  // ---------------------EarthSurface + 初始动画 ------------------------------ //
  function getEarthAndAnimate() {
    const distance = 450;
    const texutreloader = new THREE.TextureLoader().load('/shaders2/earth33.jpg');
    const spheregeometry = new THREE.SphereGeometry(210, 100, 100);
    texutreloader.magFilter = THREE.LinearFilter;
    const materialEarth = new THREE.MeshPhongMaterial({
      map: texutreloader,
      // alphaMap: texutreloader,
      transparent: true,
      opacity: 10.0,
      side: THREE.FrontSide,
      color: '#fff',
    });
    const meshEarth = new THREE.Mesh(spheregeometry, materialEarth);
    meshEarth.rotation.y = Math.PI;
    group.add(meshEarth);

    const outerloader = new THREE.TextureLoader().load('/shaders2/earth4.png');
    const outergeometry = new THREE.SphereGeometry(215, 100, 100);
    const materialOuter = new THREE.MeshPhongMaterial({
      map: outerloader,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
    });
    const meshOuter = new THREE.Mesh(outergeometry, materialOuter);
    meshOuter.rotation.y = Math.PI;
    group.add(meshOuter);
    // 动画
    const indexNum = {
      i: 2000,
      far: 1500,
    };
    // 雾化
    scene.fog = new THREE.Fog();
    scene.fog.color = new THREE.Color(0x001C52);
    scene.fog.near = 400;
    scene.fog.far = indexNum.far;

    const cameraTweenStart = new TWEEN.Tween(indexNum)
      .to({ i: 0, far: 600 }, 2500).onUpdate((d) => {
        const step = 100 * 0.00025;
        camera.position.x = (distance * Math.cos(step + 0.8)) - d.i;
        camera.position.y = distance * Math.sin(1.0);
        camera.position.z = distance * Math.sin(step + 0.9);
        camera.lookAt(scene.position);

        scene.fog.far = d.far;
      });
    cameraTweenStart.start();
  }
  /* ————————————————————飞线+圆+柱子+弹框—————————————————————————— */
  // 柱子
  function getSomething() {
    const oriPos = new THREE.Vector3(0, 0, 0);

    const calculatePos = (lat, lng, alt) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((180 - lng) * Math.PI) / 180;
      const x = alt * Math.sin(phi) * Math.cos(theta);
      const y = alt * Math.cos(phi);
      const z = alt * Math.sin(phi) * Math.sin(theta);
      const pos = new THREE.Vector3(x, y, z);
      return pos;
    };
    const maxData = d3.max(rectBarData, (d) => d.value);
    const minData = d3.min(rectBarData, (d) => d.value);
    const scale = d3.scale.linear()
                .domain([minData, maxData])
                .range([10, 50]);
    rectBarData.forEach((o) => {
      const startPos = calculatePos(o.lat, o.lng, 211);

      // const circle2geometry = new THREE.CircleGeometry(3, 6);
      // const circle2wireframegeo = new THREE.EdgesGeometry(circle2geometry); // or WireframeGeometry( geometry )
      // const circle2wireframemat = new THREE.LineBasicMaterial({ color: 0xF9FF00, linewidth: 5, side: THREE.BackSide });
      // const circle2 = new THREE.LineSegments(circle2wireframegeo, circle2wireframemat);
      // circle2.position.set(startPos.x, startPos.y, startPos.z);
      // circle2.lookAt(oriPos);
      // this.group.add(circle2);

      const beamgeometry = new THREE.CylinderGeometry(0.01, 0.8, scale(o.value), 16);
      beamgeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, scale(o.value) / 2, 0));
      beamgeometry.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-90)));
      const beammaterial = new THREE.MeshBasicMaterial({
        color: 0xFFCE00,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.0,
      });
      const beammesh = new THREE.Mesh(beamgeometry, beammaterial);
      beammesh.position.set(startPos.x, startPos.y, startPos.z);
      beammesh.lookAt(oriPos);

      const beamgeometry1 = new THREE.CylinderGeometry(1, 2.5, scale(o.value), 16);
      beamgeometry1.applyMatrix(new THREE.Matrix4().makeTranslation(0, scale(o.value) / 2, 0));
      beamgeometry1.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-90)));
      const beammaterial1 = new THREE.MeshPhongMaterial({
        color: 0xFFCE00,
        transparent: true,
        opacity: 0.0,
        depthWrite: false,
      });
      const beammesh1 = new THREE.Mesh(beamgeometry1, beammaterial1);
      beammesh1.position.set(startPos.x, startPos.y, startPos.z);
      beammesh1.lookAt(oriPos);
      group.add(beammesh);
      group.add(beammesh1);
      const indexH = {
        i: 0.0,
        h: 0,
      };
      const barTweenStart = new TWEEN.Tween(indexH)
        .to({ i: 1.0, h: scale(o.value) }, 1000).onUpdate((d) => {
          const beamgeometry2 = new THREE.CylinderGeometry(0.01, 0.8, d.h, 16);
          beamgeometry2.applyMatrix(new THREE.Matrix4().makeTranslation(0, d.h / 2, 0));
          beamgeometry2.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-90)));
          beammesh.geometry = beamgeometry2;
          beammesh.material.opacity = d.i;
          beammesh1.material.opacity = d.i / 10;
        });
      barTweenStart.delay(2500);
      barTweenStart.start();
    });
    function latlngToXYZ(coord, r) {
      const sphereArray = [];
      for (let i = 0; i < coord.length; i += 1) {
        const lat = coord[i].lat;
        const lng = coord[i].lng;

        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((180 - lng) * Math.PI) / 180;
        const posX = r * Math.sin(phi) * Math.cos(theta);
        const posY = r * Math.cos(phi);
        const posZ = r * Math.sin(phi) * Math.sin(theta);

        sphereArray.push({ x: posX, y: posY, z: posZ });
      }
      return sphereArray;
    }
    // _______飞线________
    // 计算v1，v2两个向量中点
    function getVCenter(v1, v2) {
      const v = v1.add(v2); // 将两点相加
      return v.divideScalar(2); // 向量除以标量2
    }
    // 计算v1，v2向量中固定的点（贝塞尔曲线中间亮点）
    function getLenVector(v1, v2, len) {
      const v1v2len = v1.distanceTo(v2); // 计算v1到v2到长度
      return v1.lerp(v2, len / v1v2len); // 返回一个插值百分比点坐标
    }
    // 封装飞线计算
    function curveCount(start, end) {
      // 计算起点终点
      const xyzStart = latlngToXYZ(start, 210);
      const v0 = new THREE.Vector3(xyzStart[0].x, xyzStart[0].y, xyzStart[0].z);
      const xyzEnd = latlngToXYZ(end, 210);
      const v3 = new THREE.Vector3(xyzEnd[0].x, xyzEnd[0].y, xyzEnd[0].z);

      // 获取夹角
      const angle = (v0.angleTo(v3) * 180) / Math.PI / 10;
      // 原点
      const p0 = new THREE.Vector3(0, 0, 0);
      // v0-v1之间的点长，中间射线长度
      const aLen = angle * 15;
      const hLen = angle * angle * 100;
      // 计算中点
      const vCenter = getVCenter(v0.clone(), v3.clone());
      // 定义一条射线/法线
      const rayLine = new THREE.Ray(p0, vCenter);
      // 从0点到两点中点的长度
      const atLen = rayLine.at(1, new THREE.Vector3(0, 0, 0)).distanceTo(p0);
      // 设置射线长度
      const at = hLen / atLen;
      // 设置射线顶点
      const vTop = rayLine.at(at, new THREE.Vector3(0, 0, 0));
      // 计算三次贝塞尔中间两点坐标
      const v1 = getLenVector(v0.clone(), vTop, aLen);
      const v2 = getLenVector(v3.clone(), vTop, aLen);

      const curve3 = new THREE.CubicBezierCurve3(v3, v2, v1, v0);
      return curve3;
    }
    // 设置自定义变量，传数据到着色器
    uniforms = {
      time: { type: 'f', value: 0.7 },
    };
    const tubeShaderMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: flyLineVertexShader,
      fragmentShader: flyLineFragmentShader,
      transparent: true,
    });
    // 重庆飞线
    data3.forEach((d) => {
      const start = [{
        lat: 29.31,
        lng: 106.35,
      }];
      const end = [{
        lat: d.lat,
        lng: d.lng,
      }];
      const newCurve3 = curveCount(start, end);
      // 创建样条曲线几何体
      const tubeGeometry = new THREE.TubeBufferGeometry(newCurve3, 100, 0.3, 10, false);

      const tubeMesh = new THREE.Mesh(tubeGeometry, tubeShaderMaterial);
      // let flyLineTimer = setTimeout(() => {
      group.add(tubeMesh);
      //   clearTimeout(flyLineTimer);
      //   flyLineTimer = null;
      // }, 2500);
    });
    // 其他出口国飞线
    const index1 = 4;
    data1.filter((d) => d.name !== '中国·重庆').forEach((d, i) => {
      const start = [{
        lat: parseFloat(d.lat),
        lng: parseFloat(d.lng),
      }];
      rectBarData.slice(0 + (index1 * i), index1 * (i + 1)).forEach((v) => {
        const end = [{
          lat: v.lat,
          lng: v.lng,
        }];
        const newCurve3 = curveCount(start, end);
        // 创建样条曲线几何体
        const tubeGeometry = new THREE.TubeBufferGeometry(newCurve3, 100, 0.3, 10, false);
        const tubeMesh = new THREE.Mesh(tubeGeometry, tubeShaderMaterial);
        group.add(tubeMesh);
      });
    });
    // ________圆________
    function latlngToXYZMiddle(coord, r) {
      const sphereArray = [];
      for (let i = 0; i < coord.length; i += 1) {
        let lat;
        if (parseFloat(coord[i].lat) < 10 && parseFloat(coord[i].lat) >= 0) {
          lat = parseFloat(coord[i].lat) + 10;
        } else if (parseFloat(coord[i].lat) < 0 && parseFloat(coord[i].lat) >= -10) {
          lat = parseFloat(coord[i].lat) + 20;
        } else if (parseFloat(coord[i].lat) < -10 && parseFloat(coord[i].lat) >= -20) {
          lat = parseFloat(coord[i].lat) + 30;
        } else if (parseFloat(coord[i].lat) < -20) {
          lat = parseFloat(coord[i].lat) + 40;
        } else {
          lat = parseFloat(coord[i].lat);
        }
        const lng = parseFloat(coord[i].lng) + 5;

        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((180 - lng) * Math.PI) / 180;
        const posX = r * Math.sin(phi) * Math.cos(theta);
        const posY = r * Math.cos(phi);
        const posZ = r * Math.sin(phi) * Math.sin(theta);

        sphereArray.push({ x: posX, y: posY, z: posZ });
      }
      return sphereArray;
    }
    // lines end point
    function latlngToXYZEnd(coord, r) {
      const sphereArray = [];
      for (let i = 0; i < coord.length; i += 1) {
        let lat;
        if (parseFloat(coord[i].lat) < 10 && parseFloat(coord[i].lat) >= 0) {
          lat = parseFloat(coord[i].lat) + 10;
        } else if (parseFloat(coord[i].lat) < 0 && parseFloat(coord[i].lat) >= -10) {
          lat = parseFloat(coord[i].lat) + 20;
        } else if (parseFloat(coord[i].lat) < -10 && parseFloat(coord[i].lat) >= -20) {
          lat = parseFloat(coord[i].lat) + 30;
        } else if (parseFloat(coord[i].lat) < -20) {
          lat = parseFloat(coord[i].lat) + 40;
        } else {
          lat = parseFloat(coord[i].lat);
        }
        const lng = parseFloat(coord[i].lng) + 10;

        const phi = ((90 - lat) * Math.PI) / 180;
        const theta = ((180 - lng) * Math.PI) / 180;
        const posX = r * Math.sin(phi) * Math.cos(theta);
        const posY = r * Math.cos(phi);
        const posZ = r * Math.sin(phi) * Math.sin(theta);

        sphereArray.push({ x: posX, y: posY, z: posZ });
      }
      return sphereArray;
    }
    // const d3Linear = d3.scale.linear()
    //   .domain([0, d3.max(data1, (d) => d.value)])
    //   .range([1, 3]);
    // const d3Linear2 = d3.scale.linear()
    //   .domain([0, d3.max(data1, (d) => d.value)])
    //   .range([2, 5]);
    const cityLatLng = [];
    const cityLatLngMiddle = [];
    const cityLatLngEnd = [];
    const cityLatLng2 = [];
    data1.forEach((d) => {
      const latLng = [{
        lat: d.lat,
        lng: d.lng,
      }];
      cityLatLng.push(latlngToXYZ(latLng, 210)[0]);
      cityLatLngMiddle.push(latlngToXYZMiddle(latLng, 210)[0]);
      cityLatLngEnd.push(latlngToXYZEnd(latLng, 210)[0]);
    });
    // 圆坐标
    circleData.forEach((d) => {
      const latLng = [{
        lat: d.lat,
        lng: d.lng,
      }];
      cityLatLng2.push(latlngToXYZ(latLng, 210)[0]);
    });

    const circleMat = new THREE.MeshBasicMaterial({ color: 0xFFCE00, side: THREE.DoubleSide });
    const circleMat2 = new THREE.MeshBasicMaterial({ color: 0xFFCE00, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
    // div线材质
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xFFCE00, side: THREE.DoubleSide, transparent: true, opacity: 0 });
    const lineMats = [];
    // const lineMat2 = lineMat1.clone();
    // const lineMat3 = lineMat1.clone();
    // 获取div函数
    function getText(v1, v2, v3, v4, lat, url, lemonName) {
      // 外边框
      const tD1 = document.createElement('div');
      tD1.style.opacity = '0';
      tD1.style.transition = 'opacity 2s linear';
      tD1.style.width = '230px';
      tD1.style.height = '317px';
      if (parseFloat(lat) < 20) {
        tD1.style.top = '-170px';
      } else {
        tD1.style.top = '135px';
      }
      tD1.style.left = '30px';
      tD1.style.background = "url('/shaders2/textBg2.png') no-repeat";
      tD1.style.backgroundSize = '230px 317px';
      // 内边框
      const tD2 = document.createElement('div');
      tD2.style.width = '210px';
      tD2.style.height = '297px';
      tD2.style.color = '#DFEEF4';
      tD2.style.marginTop = '10px';
      tD2.style.marginLeft = '10px';
      tD2.style.padding = '5px 10px';
      tD2.style.border = '1px solid #FFCE00';
      tD2.style.backgroundColor = 'rgba(0 ,0, 0, 0.6)';
      tD1.appendChild(tD2);

      // 文字
      const text1 = document.createElement('div');
      text1.style.fontSize = '22px';
      text1.style.fontWeight = 'bold';
      text1.innerHTML = `${v1}`;
      // 图片
      const text2 = document.createElement('div');
      text2.style.marginTop = '4px';
      text2.style.width = '180px';
      text2.style.height = '100px';
      text2.style.background = `url(${url}) no-repeat`;
      text2.style.backgroundSize = '100% 100%';
      text2.style.margin = '0 auto';
      text2.style.position = 'relative';
      const text2Title = document.createElement('div');
      // text2Title.style.width = '40px';
      text2Title.style.height = '15px';
      text2Title.style.backgroundColor = '#FFCE00';
      text2Title.style.position = 'absolute';
      text2Title.style.bottom = '0px';
      text2Title.style.fontSize = '12px';
      text2Title.style.lineHeight = '15px';
      text2Title.style.color = '#000';
      text2Title.style.textAlign = 'center';
      text2Title.innerHTML = lemonName;
      text2.appendChild(text2Title);
      // 出口量 出口额
      const text3 = document.createElement('div');
      text3.style.height = '65px';
      text3.style.width = '180px';
      text3.style.margin = '0 auto';
      text3.style.marginTop = '14px';
      const text3Left = document.createElement('div');
      text3Left.style.width = '90px';
      text3Left.style.display = 'inline-block';
      text3Left.style.verticalAlign = 'top';
      text3.appendChild(text3Left);
      const text3Left1 = document.createElement('div');
      text3Left1.innerHTML = `${(v2 / 10000).toFixed(1)}万吨`;
      text3Left1.style.fontSize = '18px';
      text3Left1.style.color = '#DFEEF4';
      text3Left.appendChild(text3Left1);
      const text3Left2 = document.createElement('div');
      text3Left2.innerHTML = '出口量';
      text3Left2.style.fontSize = '14px';
      text3Left2.style.color = '#DFEEF4';
      text3Left2.style.opacity = 0.7;
      text3Left.appendChild(text3Left2);

      const text3Right = document.createElement('div');
      text3Right.style.width = '90px';
      text3Right.style.display = 'inline-block';
      text3Right.style.verticalAlign = 'top';
      text3.appendChild(text3Right);
      const text3Right1 = document.createElement('div');
      text3Right1.innerHTML = `${(v3 / 100000).toFixed(2)}亿美元`;
      text3Right1.style.fontSize = '18px';
      text3Right1.style.color = '#DFEEF4';
      text3Right.appendChild(text3Right1);
      const text3Right2 = document.createElement('div');
      text3Right2.innerHTML = '出口金额';
      text3Right2.style.fontSize = '14px';
      text3Right2.style.color = '#DFEEF4';
      text3Right2.style.opacity = 0.7;
      text3Right.appendChild(text3Right2);

      // 主要出口国
      const text4 = document.createElement('div');
      text4.style.fontSize = '18px';
      text4.style.color = '#DFEEF4';
      text4.innerHTML = v4;
      const text5 = document.createElement('div');
      text5.style.marginTop = '5px';
      text5.style.fontSize = '14px';
      text5.style.color = '#DFEEF4';
      text5.style.opacity = 0.7;
      text5.innerHTML = '主要出口国';

      tD2.appendChild(text1);
      tD2.appendChild(text2);
      tD2.appendChild(text3);
      tD2.appendChild(text4);
      tD2.appendChild(text5);
      return tD1;
    }
    const lineOpts = [];
    // const lineOpt1 = {
    //   opacity: 0,
    // };
    // const lineOpt2 = {
    //   opacity: 0,
    // };
    // const lineOpt3 = {
    //   opacity: 0,
    // };
    // 画圆形
    cityLatLng2.forEach((d) => {
      const circleGeo = new THREE.CircleBufferGeometry(3, 32);
      circleGeo.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-180)));
      const circleMesh = new THREE.Mesh(circleGeo, circleMat);
      circleMesh.name = 'c1';
      circleMesh.position.set(d.x * 1.002, d.y * 1.002, d.z * 1.002);
      circleMesh.lookAt(new THREE.Vector3(0, 0, 0));
      group.add(circleMesh);
      arr.push(circleMesh);

      const circleGeo2 = new THREE.CircleBufferGeometry(5, 32);
      circleGeo2.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-180)));
      const circleMesh2 = new THREE.Mesh(circleGeo2, circleMat2);
      circleMesh2.position.set(d.x * 1.001, d.y * 1.001, d.z * 1.001);
      circleMesh2.lookAt(new THREE.Vector3(0, 0, 0));
      group.add(circleMesh2);
      pointPosition2.push(circleMesh2);
    });
    // 弹框
    cityLatLng.forEach((d, i) => {
      lineOpts.push({ opacity: 0 });
      const circleGeo3 = new THREE.CircleBufferGeometry(5, 32);
      circleGeo3.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-180)));
      const circleMesh3 = new THREE.Mesh(circleGeo3, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }));
      circleMesh3.position.set(d.x * 1.001, d.y * 1.001, d.z * 1.001);
      circleMesh3.lookAt(new THREE.Vector3(0, 0, 0));
      group.add(circleMesh3);
      pointPosition.push(circleMesh3);
      isShows.push(true);

      // ————————————————弹框——————————————————————————
      // 线
      const startV3 = new THREE.Vector3(d.x * 1.001, d.y * 1.001, d.z * 1.001);
      const middleV3 = new THREE.Vector3(cityLatLngMiddle[i].x * 1.151, cityLatLngMiddle[i].y * 1.151, cityLatLngMiddle[i].z * 1.151);
      const endV3 = new THREE.Vector3(cityLatLngEnd[i].x * 1.151, cityLatLngEnd[i].y * 1.151, cityLatLngEnd[i].z * 1.151);
      // 弹框文字
      const text = getText(data1[i].name, data1[i].value, data1[i].money, data1[i].export, data1[i].lat, data1[i].imgUrl, data1[i].lemonName);
      const css2DLabelTwo = new CSS2DObject(text);
      css2DLabelTwo.position.set(cityLatLngEnd[i].x * 1.151, cityLatLngEnd[i].y * 1.151, cityLatLngEnd[i].z * 1.151);
      group.add(css2DLabelTwo);
      textArr.push(text);

      const line1 = new THREE.CatmullRomCurve3([startV3, middleV3, endV3]);
      const lineGeo1 = new THREE.TubeGeometry(line1, 2, 0.2, 8, false);
      const lineMatClone = lineMat.clone();
      lineMats.push(lineMatClone);
      const lineMesh = new THREE.Mesh(lineGeo1, lineMatClone);
      group.add(lineMesh);
      // 显隐动画
      const lineTween = new TWEEN.Tween(lineOpts[i])
        .to({ opacity: 1 }, 2000).onUpdate((d1) => {
          lineMesh.material.opacity = d1.opacity;
        });
      const lineTweenUn = new TWEEN.Tween(lineOpts[i])
        .to({ opacity: 0 }, 2000).onUpdate((d1) => {
          lineMesh.material.opacity = d1.opacity;
        });
      animations.push([lineTween, lineTweenUn]);
    });
    // ___________圆环动画_____________
    // const circleGeo3Scale = d3.scale.linear()
    //   .domain([0, d3.max(circleData, (d) => d.value)])
    //   .range([1, 3]);
    cOpaSca = {
      opacity: 1,
      scale: 1,
    };
    cOpaSca2 = {
      opacity: 1,
      scale: 1,
    };
    const circleMat3 = new THREE.MeshBasicMaterial({ color: 0xFFCE00, transparent: true });
    cityLatLng2.forEach((d) => {
      const circleGeo3 = new THREE.CircleGeometry(3, 32);
      circleGeo3.vertices.shift();
      circleGeo3.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-180)));
      const cMat1 = circleMat3.clone();
      const circleLoop = new THREE.LineLoop(circleGeo3, cMat1);
      circleLoop.position.set(d.x * 1.001, d.y * 1.001, d.z * 1.001);
      circleLoop.lookAt(new THREE.Vector3(0, 0, 0));
      group.add(circleLoop);
      const circleGeo4 = circleGeo3.clone();
      const cMat2 = circleMat3.clone();
      const circleLoop2 = new THREE.LineLoop(circleGeo4, cMat2);
      circleLoop2.position.set(d.x * 1.001, d.y * 1.001, d.z * 1.001);
      circleLoop2.lookAt(new THREE.Vector3(0, 0, 0));
      group.add(circleLoop2);

      const circleTween1 = new TWEEN.Tween(cOpaSca)
        .to({ opacity: 0, scale: 4 }, 2000).onUpdate((v) => {
          circleLoop.material.opacity = v.opacity;
          circleLoop.scale.set(v.scale, v.scale, v.scale);
        });
      const circleTween2 = new TWEEN.Tween(cOpaSca2)
        .to({ opacity: 0, scale: 4 }, 2000).onUpdate((v) => {
          circleLoop2.material.opacity = v.opacity;
          circleLoop2.scale.set(v.scale, v.scale, v.scale);
        });
      circleTween1.start().repeat(Infinity);
      let tweenTimer = setTimeout(() => {
        circleTween2.start().repeat(Infinity);
        clearTimeout(tweenTimer);
        tweenTimer = null;
      }, 1000);
    });
    // ————————————————大环——————————————————————————
    const bigCGeo = new THREE.CircleGeometry(320, 1000, 1000);
    bigCGeo.vertices.shift();
    const vertices1 = bigCGeo.vertices;
    vertices1.forEach((d) => {
      const pointMat2 = new THREE.PointsMaterial({
        size: Math.random() - 0.5,
        color: 0x0079FB,
        transparent: true,
        opacity: Math.random() - 0.5,
        side: THREE.DoubleSide,
      });
      const particle = new THREE.Sprite(pointMat2);
      particle.position.set(d.x, d.y, d.z);
      pointG1.add(particle);
    });
    const bigCGeo2 = new THREE.CircleGeometry(270, 1000, 1000);
    bigCGeo2.vertices.shift();
    const vertices2 = bigCGeo2.vertices;
    vertices2.forEach((d) => {
      const pointMat3 = new THREE.PointsMaterial({
        size: Math.random() - 0.5,
        color: 0x0079FB,
        transparent: true,
        opacity: Math.random() - 0.5,
        side: THREE.DoubleSide,
      });
      const particle2 = new THREE.Sprite(pointMat3);
      particle2.position.set(d.x, d.y, d.z);
      pointG2.add(particle2);
      const particle3 = new THREE.Sprite(pointMat3);
      particle3.position.set(d.x, d.y, d.z);
      pointG3.add(particle3);
    });
  }
  // 渲染
  function init() {
    if (scene && scene.children && scene.children.length > 0) {
      clearThree(scene);
    }
    getThree();
    getEarthAndAnimate();
    getSomething();
  }
  init();
  if (threeDiv.children && threeDiv.children.length > 0) {
    threeDiv.removeChild(threeDiv.children[0]);
  }
  threeDiv.appendChild(css2DRenderer.domElement);
  let n = 0;
  let n1 = 0;
  let po;
  const vec = new THREE.Vector3(0, 0, 0);
  const render = () => {
    render1 = requestAnimationFrame(render);
    n1 += 0.003;
    // 0.6 4.5 2.3
    if (!show) {
      n += 0.002;
      group.rotation.y = n;
      pointPosition.forEach((d, i) => {
        po = d.getWorldPosition(vec);
        if ((po.x > 0 && po.x < 149) && (po.y > -210 && po.y < 210) && (po.z > 0 && po.z < 149) && isShows[i]) {
          // 进入区域，停止转动
          show = true;
          isShows[i] = false;
          animations[i][0].start();
          textArr[i].style.opacity = 1;
          let showTimer1 = setTimeout(() => {
            // 弹框弹出动画
            animations[i][1].start();
            textArr[i].style.opacity = 0;
            let showTimer2 = setTimeout(() => {
              // 弹框隐藏动画
              show = false;
              let isShowSet1 = setTimeout(() => {
                // 状态初始化
                isShows[i] = true;
                clearTimeout(isShowSet1);
                isShowSet1 = null;
              }, 50000 + ((data1.length - 1) * 6000));
              clearTimeout(showTimer2);
              showTimer2 = null;
            }, 2000);
            clearTimeout(showTimer1);
            showTimer1 = null;
          }, 4000);
        }
      });
    }
    pointG1.rotation.x = n1;
    pointG2.rotation.y = n1;
    pointG3.rotation.x = pointG3.rotation.y = n1;
    // const delta = clock.getDelta();
    // orbitControls.update(delta);
    TWEEN.update();

    uniforms.time.value += 0.01;

    renderer.clear();
    css2DRenderer.render(scene, camera);
    renderer.render(scene, camera);
  };
  if (render1) {
    cancelAnimationFrame(render1);
    render1 = null;
  }
  render();
}
