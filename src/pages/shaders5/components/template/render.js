import * as THREE from 'three';
import TrackballControls from 'three/examples/js/controls/TrackballControls';
import OBJLoader from 'three/examples/js/loaders/OBJLoader';
import {
  shaderVs,
  shaderFs
} from './shader'
// import {
// } from './count'

/* eslint-disable */
export default function render(node, data, option) {

  const 
    width = window.innerWidth,
    height = window.innerHeight,
    hii = 'hi';
  const shaderUniform = {
    iTime: {
      value: 0
    },
    iResolution: {
      value: new THREE.Vector3(40, 40, 1)
    },
  };

  let
    scene,
    renderer,
    camera,
    light,
    axes,
    controls,
    hi
    ;
  
  // 
  initThree()
  initCamera()
  initControl()
  initLight()
  initAxes()

  initSpherePoint()

  initRender()
  
  function initThree() {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor(new THREE.Color('#333'), 1.0);
    node.append(renderer.domElement);
    
  }
  function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 50;
    
    camera.lookAt(scene.position);
  }
  function initControl() {
    controls = new THREE.TrackballControls(camera);
    controls.noRotate = false
    controls.zoomSpeed = 5;
    controls.panSpeed = 5;
    controls.noZoom = false;
    controls.noPan = false;
  }
  function initLight() {
    light = new THREE.AmbientLight(new THREE.Color('rgb(255, 255, 255)'), 1.0, 0);
    light.position.set(0, 20, 20);
    scene.add(light);
  }
  function initAxes() {
    axes = new THREE.AxisHelper(20);
    scene.add(axes);
  }

  function initSpherePoint() {
    // 定义粒子几何体
    const geometry = new THREE.PlaneGeometry(25, 20, 32);

    const material = new THREE.ShaderMaterial({
      uniforms: shaderUniform,
      vertexShader: shaderVs,
      fragmentShader: shaderFs,
      transparent: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
  }

  function initRender() {
    renderer.clear();
    requestAnimationFrame(initRender);
    // key**粒子变化
    shaderUniform.iTime.value += 0.01;
    renderer.render(scene, camera);  
    // 即使用了CanvasTexture，也还是要设置，才能实时变更
    controls.update();
  }



  // 函数-----------------------------------------------------------------------------
  

}
