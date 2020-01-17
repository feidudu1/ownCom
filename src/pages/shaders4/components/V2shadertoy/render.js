import * as THREE from 'three';
import TrackballControls from 'three/examples/js/controls/TrackballControls';
import OBJLoader from 'three/examples/js/loaders/OBJLoader';
// import {
//   shaderVs,
//   shaderFs
// } from './shader_right'
import {
  shaderVs,
  shaderFs
} from './shader'
import ShaderToyMaterial from 'three-shadertoy-material'
import EffectComposer from 'three/examples/js/postprocessing/EffectComposer.js';
import ShaderPass from 'three/examples/js/postprocessing/ShaderPass.js';
import RenderPass from 'three/examples/js/postprocessing/RenderPass.js';
import CopyShader from 'three/examples/js/shaders/CopyShader.js';
import GlitchPass from 'three/examples/js/postprocessing/GlitchPass.js';
// import ShaderToyMaterial from 'three-shadertoy-material/src/ShaderToyMaterial'
import ma from './shaderM_right'
// import ma from './shaderMaterial'
// import {
// } from './count'

/* eslint-disable */
export default function render(node, data, option) {

  const 
    width = window.innerWidth,
    height = window.innerHeight,
    hii = 'hi';
  const shaderUniform = {
    uniforms: {
      iTime: {
        value: 0
      },
      iResolution: {
        type: 'v2',
        value: new THREE.Vector2(width, height)
      },
      tDiffuse: {
        type: 't',
        value: null,
      }
    },
    vertexShader: shaderVs,
    fragmentShader: shaderFs
  };

//   THREE.CustomGrayScaleShader = {
//     uniforms: {
//         "tDiffuse": {type: "t", value: null},
//         "rPower": {type: "f", value: 0.2126},
//         "gPower": {type: "f", value: 0.7152},
//         "bPower": {type: "f", value: 0.0722}
//     },
//     vertexShader: 
//       `varying vec2 vUv;
//       void main() {
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//       }`,
//     fragmentShader: `
//       uniform float rPower;
//       uniform float gPower;
//       uniform float bPower;
//       uniform sampler2D tDiffuse;
//       varying vec2 vUv;
//       void main() {
//         vec4 texel = texture2D(tDiffuse, vUv);
//         float gray = texel.r * rPower + texel.g * gPower + texel.b * bPower;
//         gl_FragColor = vec4(vec3(gray), texel.w);
//       }
//     `
// };

  let
    scene,
    renderer,
    camera,
    light,
    axes,
    controls,
    composer,
    pass,
    pass2,
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
    renderer.shadowMap.enabled = true;
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
    light = new THREE.DirectionalLight('#f56', 1.5);
    // light = new THREE.AmbientLight(new THREE.Color('rgb(25, 255, 255)'), 1.0, 0);
    light.position.set(0, 20, 20);
    light.castShadow = true;
    // light.shadow.mapSize.width = 20;
    // light.shadow.mapSize.height = 20;
    // light.shadow.camera.far = 3500;
    // light.shadow.bias = -0.0001;
    scene.add(light);
  }
  function initAxes() {
    axes = new THREE.AxisHelper(20);
    // scene.add(axes);
  }

  function initSpherePoint() {
    // 定义粒子几何体
    const geometry = new THREE.DodecahedronBufferGeometry(4, 2)
    // const geometry2 = new THREE.DodecahedronBufferGeometry(4.01, 2)
    // const geometry = new THREE.BoxGeometry(4, 4, 4);

    // const material2 = new THREE.ShaderMaterial({
    //   uniforms: shaderUniform,
    //   vertexShader: shaderVs,
    //   fragmentShader: shaderFs,
    //   transparent: true,
    // })
    // const material = new THREE.MeshPhongMaterial({
    const material = new THREE.MeshBasicMaterial({
      color: `#afeeee`,
      transparent: true,
      // depthTest: true,
      // wireframe: true,
      // opacity: 0.5
    })
    // const material2 = new THREE.MeshBasicMaterial({
    //   color: `#359`,
    //   // transparent: true,
    //   // depthTest: true,
    //   wireframe: true,
    //   // opacity: 0.5
    // })
    // const material = new ShaderToyMaterial(ma)
    const mesh = new THREE.Mesh(geometry, material)
    // const mesh2 = new THREE.Mesh(geometry2, material2)
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh)
    // scene.add(mesh2)
    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    pass = new ShaderPass(shaderUniform);
    pass.renderToScreen = true;

    var effectCopy = new THREE.ShaderPass(CopyShader);
    effectCopy.renderToScreen = true;
    
    composer.addPass(effectCopy)
    composer.addPass(pass)
  }

  function initRender() {
    renderer.clear();
    requestAnimationFrame(initRender);
    // key**粒子变化
    shaderUniform.uniforms.iTime.value += 0.1;
    // renderer.render(scene, camera);  
    
    // 即使用了CanvasTexture，也还是要设置，才能实时变更
    controls.update();
    composer.render();
  }



  // 函数-----------------------------------------------------------------------------
  

}
