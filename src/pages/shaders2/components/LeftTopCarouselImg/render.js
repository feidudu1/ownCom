import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';

let scene;
let camera;
let webGLRender;
let group;
let render1;
let orbitControls = null;
// let clock = null;
const rotateY = { y: 90 };
let sceneRotateAnimation;

const render = (id, data, option, getChooseNum) => {
  const {
    width,
    height,
  } = option || {};

  let chooseNum = 0; // 轮播
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
  function getThree() {
    webGLRender = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: id,
    });
    webGLRender.setClearColor('#fff');
    webGLRender.setClearAlpha(0);
    webGLRender.setSize(width, height);
    scene = new THREE.Scene();
    scene.renderOrder = 1;
    scene.position.y = -4;
    scene.rotation.y = -85 * (Math.PI / 180);
    scene.fog = new THREE.Fog(0x000000, 40, 90);
    // const fog = new THREE.Fog();
    // fog.color = new THREE.Color(0x001C52);

    camera = new THREE.PerspectiveCamera(48, width / height, 1, 5000);
    camera.position.set(0, 25, 60);

    group = new THREE.Group();
    group.rotation.x = -90 * (Math.PI / 180);
    scene.add(group);

    const lighting = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(lighting);
    const pointlight = new THREE.DirectionalLight('white', 0.4);
    pointlight.position.set(200, 200, 200).normalize();
    scene.add(pointlight);

    // 定义控制器
    orbitControls = new OrbitControls(camera);
    // 右键是否移动
    orbitControls.enablePan = false;
    // 是否可旋转，旋转速度
    orbitControls.enableRotate = false;
    orbitControls.rotateSpeed = 0.25;
    // 是否可以缩放
    orbitControls.enableZoom = false;
    // 使动画循环使用时阻尼或自转,意思是否有惯性
    orbitControls.enableDamping = false;
    orbitControls.dampingFactor = 0.2;
    // clock = new THREE.Clock();
  }
  function getCircle3D() {
    const c1 = new THREE.CircleBufferGeometry(10, 32);
    const c2 = new THREE.CircleBufferGeometry(11, 32);
    const c3 = new THREE.CircleGeometry(12, 32);
    c3.vertices.shift();
    const c4 = new THREE.CircleGeometry(24, 60); // 虚线
    c4.vertices.shift();
    const c5 = new THREE.CircleGeometry(30, 64);
    c5.vertices.shift();
    const c6 = new THREE.CircleGeometry(31, 64);
    c6.vertices.shift();
    const cMat1 = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.2,
      color: 0x0079FB,
    });
    const cMat2 = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.6,
      color: 0x0079FB,
    });
    const cMat3 = new THREE.LineDashedMaterial({
      transparent: true,
      opacity: 0.6,
      color: 0x0079FB,
      dashSize: 1,
      gapSize: 1,
    });
    const cMat4 = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0.4,
      color: 0x0079FB,
    });
    const cMat5 = new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: 0.8,
      color: 0x00E6FF,
    });
    const c1Mesh = new THREE.Mesh(c1, cMat1);
    c1Mesh.position.z = 0.1;
    const c2Mesh = new THREE.Mesh(c2, cMat1);
    const c3Mesh = new THREE.LineLoop(c3, cMat2);
    const c4Mesh = new THREE.Line(c4, cMat3);
    c4Mesh.computeLineDistances();
    const c5Mesh = new THREE.LineLoop(c5, cMat4);
    const c6Mesh = new THREE.LineLoop(c6, cMat5);
    group.add(c1Mesh);
    group.add(c2Mesh);
    group.add(c3Mesh);
    group.add(c4Mesh);
    group.add(c5Mesh);
    group.add(c6Mesh);

    // 虚线上圆
    const vecs = c4.vertices;
    const vecLen = Math.floor(vecs.length / data.length);
    for (let i = 0; i < data.length; i += 1) {
      const highLight = i === chooseNum || false;

      const imgs = document.createElement('img');
      imgs.src = data[i].y;
      imgs.onload = function () {
        const self = this;
        const canvasText = document.createElement('canvas');
        canvasText.width = 512;
        canvasText.height = 512;
        const ctxs = canvasText.getContext('2d');
        const textMap = getCanvasText(canvasText, ctxs, highLight, imgs, self);
        const spriteMat = new THREE.SpriteMaterial({ map: textMap, depthWrite: false });
        const spriteMesh = new THREE.Sprite(spriteMat);
        if ((vecLen * i) === vecs.length) {
          spriteMesh.position.set(vecs[(vecLen * i) - 1].x * 1.01, vecs[(vecLen * i) - 1].y * 1.01, vecs[(vecLen * i) - 1].z * 1.01);
        } else {
          spriteMesh.position.set(vecs[vecLen * i].x * 1.01, vecs[vecLen * i].y * 1.01, vecs[vecLen * i].z * 1.01);
        }
        spriteMesh.scale.set(12, 12, 12);
        c4Mesh.add(spriteMesh);
      };
    }
  }
  function getCanvasText(cans, ctx, show, img, self) {
    const image = img;
    const canvas2d = ctx;
    canvas2d.beginPath();
    canvas2d.clearRect(0, 0, 512, 512); // 清空画布
    canvas2d.fillStyle = 'rgba(0, 255, 255, 0)'; // 背景色
    canvas2d.fillRect(0, 0, 512, 512); // 画背景
    // 画圆
    canvas2d.arc(512 / 2, 512 / 2, 200, 0, 2 * Math.PI);
    const radial = canvas2d.createRadialGradient(512 / 2, 512 / 2, 100, 512 / 2, 512 / 2, 200);
    radial.addColorStop(0, 'rgba(0, 121, 251, 0)');
    if (show) {
      radial.addColorStop(1, 'rgba(0, 121, 251, 0.7)');
    } else {
      radial.addColorStop(1, 'rgba(0, 121, 251, 0.2)');
    }
    canvas2d.fillStyle = radial;
    canvas2d.fill();
    canvas2d.closePath();

    if (show) {
      canvas2d.beginPath();
      canvas2d.arc(512 / 2, 512 / 2, 210, 0, 2 * Math.PI);
      canvas2d.strokeStyle = '#00B1FD';
      canvas2d.lineWidth = 13;
      canvas2d.stroke();
      canvas2d.closePath();
    }
    // 图像
    let imgScale = 1;
    const maxNumber = 300;
    if (self.width > maxNumber || self.height > maxNumber) {
      if (self.width > self.height) {
        imgScale = maxNumber / self.width;
      } else {
        imgScale = maxNumber / self.height;
      }
    }
    // const imgWScale = self.width / 256;
    // const imgHScale = self.height / 256;
    // const imgW = self.width / (Math.round(imgWScale));
    // const imgH = self.height / (Math.round(imgHScale));
    const imgW = self.width * imgScale;
    const imgH = self.height * imgScale;
    canvas2d.drawImage(image, (512 / 2) - (imgW / 2), (512 / 2) - (imgH / 2), imgW, imgH);

    const texture = new THREE.Texture(cans);
    texture.needsUpdate = true;
    return texture;
  }
  function init() {
    if (scene && scene.children && scene.children.length > 0) {
      clearThree(scene);
    }
    getThree();
    getCircle3D();
  }
  init();
  // 旋转动画
  const angle = Math.floor(360 / data.length);
  sceneRotateAnimation = new TWEEN.Tween(rotateY)
    .to({ y: angle + rotateY.y }, 1000).onUpdate((d) => {
      scene.rotation.y = (-d.y * Math.PI) / 180;
    });
  function rotateAni() {
    sceneRotateAnimation.start();
    rotateY.y += angle;

    sceneRotateAnimation = new TWEEN.Tween(rotateY)
    .to({ y: angle + rotateY.y }, 1000).onUpdate((d) => {
      scene.rotation.y = (-d.y * Math.PI) / 180;
    });
  }

  let num = 0;
  function renderer() {
    num += 1;
    if (num > 300) {
      if (chooseNum === data.length - 1) {
        chooseNum = 0;
      } else {
        chooseNum += 1;
      }
      getChooseNum(chooseNum);
      clearThree(group);
      getCircle3D();
      rotateAni();
      num = 0;
    }
    // const delta = clock.getDelta();
    // orbitControls.update(delta);
    TWEEN.update();

    render1 = requestAnimationFrame(renderer);
    webGLRender.render(scene, camera);
  }
  if (render1) {
    cancelAnimationFrame(render1);
    render1 = null;
  }
  renderer();
};
export default render;
