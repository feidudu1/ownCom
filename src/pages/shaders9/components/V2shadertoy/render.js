import * as THREE from 'three';
import TrackballControls from 'three/examples/js/controls/TrackballControls';
import OBJLoader from 'three/examples/js/loaders/OBJLoader';
// import {
//   shaderVs,
//   shaderFs
// } from './shader_right'
// import {
//   shaderVs,
//   shaderFs
// } from './shader_1'
import {
  shaderVs,
  shaderFs
} from './shader'
import ShaderToyMaterial from 'three-shadertoy-material'
import EffectComposer from 'three/examples/js/postprocessing/EffectComposer.js';
import ShaderPass from 'three/examples/js/postprocessing/ShaderPass.js';
import RenderPass from 'three/examples/js/postprocessing/RenderPass.js';
import CopyShader from 'three/examples/js/shaders/CopyShader.js';
import GLTFLoader from 'three/examples/js/loaders/GLTFLoader';
import GlitchPass from 'three/examples/js/postprocessing/GlitchPass.js';
// import ShaderToyMaterial from 'three-shadertoy-material/src/ShaderToyMaterial'
import ma from './shaderM_right'
import zuanshiData from './zuanshi.gltf';
// import ma from './shaderMaterial'
// import {
// } from './count'

/* eslint-disable */
export default function render(node, data, option) {

  const 
    width = window.innerWidth,
    height = window.innerHeight,
    hii = 'hi';
  // const shaderUniform = {
  //   uniforms: {
  //     iTime: {
  //       value: 0
  //     },
  //     iResolution: {
  //       type: 'v2',
  //       value: new THREE.Vector2(width, height)
  //     },
  //     tDiffuse: {
  //       type: 't',
  //       value: null,
  //     },
  //     // tNoise: {
  //     //   type: 't',
  //     //   // value: new THREE.TextureLoader().load('/noise.jpg')
  //     //   value: new THREE.TextureLoader().load('/glass_noise.jpg')
  //     // }
  //   },
  //   vertexShader: shaderVs,
  //   fragmentShader: shaderFs
  // };
  const shaderUniform2 = {
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
      },
      tNoise: {
        type: 't',
        // value: new THREE.TextureLoader().load('/noise.jpg')
        value: new THREE.TextureLoader().load('/wall_noise.jpg')
        // value: new THREE.TextureLoader().load('/glass_noise.jpg')
      },
      iMouse: {
        type: 'v3',
        value: new THREE.Vector3(0.0, 0.0, 0,0)
      }
    },
    vertexShader: shaderVs,
    fragmentShader: shaderFs
  };

//   const shaderUniform2 = {
//   // THREE.CustomGrayScaleShader = {
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
    mesh,
    zuanShiObj3D = new THREE.Object3D(),
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
    // light = new THREE.DirectionalLight('#fff', 1.5);
    // // light = new THREE.AmbientLight(new THREE.Color('rgb(25, 255, 255)'), 1.0, 0);
    // light.position.set(0, 20, 20);
    // light.castShadow = true;
    // // light.shadow.mapSize.width = 20;
    // // light.shadow.mapSize.height = 20;
    // // light.shadow.camera.far = 3500;
    // // light.shadow.bias = -0.0001;
    // scene.add(light);

    const pos1 = [0, 200, 200]
    const pos2 = [500, 100, 100]
    const pos3 = [0, 0, 200]
    var pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(...pos1);
    scene.add(pointLight);

    var sideLight = new THREE.PointLight(0xffffff);
    sideLight.position.set(...pos2);
    scene.add(sideLight);

    var lowerLight = new THREE.PointLight(0xffffff);
    lowerLight.position.set(...pos3);
    scene.add(lowerLight);
  }
  function initAxes() {
    axes = new THREE.AxisHelper(20);
    // scene.add(axes);
  }

  function initSpherePoint() {
    // 定义粒子几何体
    // const geometry = new THREE.DodecahedronBufferGeometry(4, 2)
    // const geometry2 = new THREE.DodecahedronBufferGeometry(4.01, 2)
    const geometry = new THREE.BoxGeometry(10, 10, 10);

    // const material2 = new THREE.ShaderMaterial({
    //   uniforms: shaderUniform2,
    //   vertexShader: shaderVs2,
    //   fragmentShader: shaderFs2,
    //   transparent: true,
    // })
    // const material = new THREE.ShaderMaterial({
    //   uniforms: shaderUniform,
    //   vertexShader: shaderVs,
    //   fragmentShader: shaderFs,
    //   transparent: true,
    // })
    // const material = new THREE.MeshPhongMaterial({
    const material = new THREE.MeshLambertMaterial({
      color: `#2be5ff`,
      transparent: true,
      shading: THREE.FlatShading,
      // side: THREE.DoubleSide,
      // depthTest: false,
      // wireframe: true,
      // opacity: 0.8
    })
    // const material = new THREE.MeshBasicMaterial({
    //   map: new THREE.TextureLoader().load('/glass_noise.jpg')
    // })
    // const material2 = new THREE.MeshBasicMaterial({
    //   color: `#359`,
    //   // transparent: true,
    //   // depthTest: true,
    //   wireframe: true,
    //   // opacity: 0.5
    // })
    // const material = new ShaderToyMaterial(ma)
    mesh = new THREE.Mesh(geometry, material)
    // const mesh2 = new THREE.Mesh(geometry2, material2)
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.position.set(0, 0, 0)
    // scene.add(mesh)
    

    const load = new GLTFLoader();
    const scaleNum = [0.001, 0.001, 0.001];
    zuanShiObj3D.rotation.x = -Math.PI / 2.3;
    zuanShiObj3D.scale.set(...scaleNum);
    zuanShiObj3D.position.set(0, 0, 0)
    scene.add(zuanShiObj3D)
    load.load(zuanshiData, v => {
      const zuanShiModule = v.scene.children[0].children[0];      
      const zuanshiMesh1 = zuanShiModule.children[0];
      zuanshiMesh1.material = material;
      const zuanshiMesh2 = zuanShiModule.children[1];
      zuanshiMesh2.material = material;
      const zuanshiMesh3 = zuanShiModule.children[2];
      zuanshiMesh3.material = material;
      const zuanshiMesh4 = zuanShiModule.children[3];
      zuanshiMesh4.material = material;
      const zuanshiMesh5 = zuanShiModule.children[4];
      zuanshiMesh5.material = material;
      const zuanshiMesh6 = zuanShiModule.children[5];
      zuanshiMesh6.material = material;
      const zuanshiMesh7 = zuanShiModule.children[6];
      zuanshiMesh7.material = material;

      zuanShiObj3D.add(zuanshiMesh1, zuanshiMesh2, zuanshiMesh3, zuanshiMesh4, zuanshiMesh5, zuanshiMesh6, zuanshiMesh7)
    })
    camera.lookAt(zuanShiObj3D.position)

    composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    // pass = new ShaderPass(THREE.CustomGrayScaleShader);
    pass = new ShaderPass(shaderUniform2);
    pass.renderToScreen = true;

    var effectCopy = new THREE.ShaderPass(CopyShader);
    effectCopy.renderToScreen = true;
    
    composer.addPass(effectCopy)
    composer.addPass(pass)
  }

  function initRender() {
    renderer.clear();
    requestAnimationFrame(initRender);
    zuanShiObj3D.rotation.z = zuanShiObj3D.rotation.z + 0.01
    // key**粒子变化
    shaderUniform2.uniforms.iTime.value += 0.1;
    // renderer.render(scene, camera);
    
    // 即使用了CanvasTexture，也还是要设置，才能实时变更
    controls.update();
    composer.render();
  }



  // 函数-----------------------------------------------------------------------------
  

}
