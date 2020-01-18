
// ref: https://umijs.org/config/

let publicPath
if(process.env.UMI_ENV === 'dev') {
  publicPath = '/static/'
} else if (process.env.UMI_ENV === 'prod') {
  publicPath = '/./'
}

export default {
  publicPath,
  define: {

  },
  treeShaking: true,
  theme: './theme-config.js',
  targets: {
    ie: 11,
  },
  disableCSSModules: true,
  // proxy: {
  //   "/api": {
  //     // "target": "http://10.70.119.181:18081/indicator/v1/",
  //     // "target": "http://10.70.119.181:18081/indicator/v1/", //稼轩本地
  //     "target": "http://192.168.221.9:8082/indicator/v1/",
  //     "changeOrigin": true,
  //     "pathRewrite": {
  //       "^/api": ""
  //     }
  //   }
  // },
  // 自定义路由开启则默认路由不再生效
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts',
  //     routes: [
  //       {
  //         path: '/s3',
  //         component: './s3'
  //       }
  //     ]
  //   },
  // ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: true,
      dynamicImport: true,
      title: '资产管理系统',
      links: [{
        rel: 'shortcut icon',
        href: '/favicon.ico'
      }],
      dll: false,
      routes: {
        exclude: [
          /components\//,
          /models\//,
          /services\//,
        ]
      },
    }],
    'umi-plugin-polyfill'
  ],
  chainWebpack(config, { webpack }) {
    config.module.rule('gltf')
      .test(/\.(gltf)$/)
      .use('gltf-webpack-loader')
      .loader('gltf-webpack-loader')
    config.module.rule('gltf')
      .test(/\.(obj)$/)
      .use('webpack-obj-loader')
      .loader('webpack-obj-loader')

    config.module.rule()
      .oneOf('GLTFLoader')
      .test(require.resolve('three/examples/js/loaders/GLTFLoader'))
      .use('imports-loader?THREE=three')
      .loader('imports-loader?THREE=three')
      .end()
      .test(require.resolve('three/examples/js/loaders/GLTFLoader'))
      .use('exports-loader?THREE.GLTFLoader')
      .loader('exports-loader?THREE.GLTFLoader')
      .end()
      .end()
      // 
      .oneOf('OBJLoader')
      .test(require.resolve('three/examples/js/loaders/OBJLoader'))
      .use('imports-loader?THREE=three')
      .loader('imports-loader?THREE=three')
      .end()
      .test(require.resolve('three/examples/js/loaders/OBJLoader'))
      .use('exports-loader?THREE.OBJLoader')
      .loader('exports-loader?THREE.OBJLoader')
      .end()
      .end()
      // 
      .oneOf('CopyShader')
      .test(require.resolve('three/examples/js/shaders/CopyShader.js'))
      .use('imports-loader?THREE=three')
      .loader('imports-loader?THREE=three')
      .end()
      .test(require.resolve('three/examples/js/shaders/CopyShader.js'))
      .use('exports-loader?THREE.CopyShader')
      .loader('exports-loader?THREE.CopyShader')
      .end()
      .end()
      // 
      .oneOf('EffectComposer')
      .test(require.resolve('three/examples/js/postprocessing/EffectComposer.js'))
      .use('imports-loader?THREE=three')
      .loader('imports-loader?THREE=three')
      .end()
      .test(require.resolve('three/examples/js/postprocessing/EffectComposer.js'))
      .use('exports-loader?THREE.EffectComposer')
      .loader('exports-loader?THREE.EffectComposer')
      .end()
      .end()
      // 
      .oneOf('ShaderPass')
      .test(require.resolve('three/examples/js/postprocessing/ShaderPass.js'))
      .use('imports-loader?THREE=three')
      .loader('imports-loader?THREE=three')
      .end()
      .test(require.resolve('three/examples/js/postprocessing/ShaderPass.js'))
      .use('exports-loader?THREE.ShaderPass')
      .loader('exports-loader?THREE.ShaderPass')
      .end()
      .end()
      // 
      .oneOf('RenderPass')
      .test(require.resolve('three/examples/js/postprocessing/RenderPass.js'))
      .use('imports-loader?THREE=three')
      .loader('imports-loader?THREE=three')
      .end()
      .test(require.resolve('three/examples/js/postprocessing/RenderPass.js'))
      .use('exports-loader?THREE.RenderPass')
      .loader('exports-loader?THREE.RenderPass')
      .end()
      .end()
      // 
      .oneOf('GlitchPass')
      .test(require.resolve('three/examples/js/postprocessing/GlitchPass.js'))
      .use('imports-loader?THREE=three')
      .loader('imports-loader?THREE=three')
      .end()
      .test(require.resolve('three/examples/js/postprocessing/GlitchPass.js'))
      .use('exports-loader?THREE.GlitchPass')
      .loader('exports-loader?THREE.GlitchPass')
      .end()
      .end()
      // 
      .oneOf('TrackballControls')
      .test(require.resolve('three/examples/js/controls/TrackballControls'))
      .use('imports-loader?THREE=three')
      .loader('imports-loader?THREE=three')
      .end()
      .test(require.resolve('three/examples/js/controls/TrackballControls'))
      .use('exports-loader?THREE.TrackballControls')
      .loader('exports-loader?THREE.TrackballControls')

  }
}
