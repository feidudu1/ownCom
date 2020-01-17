// 粒子变化，time
export const shaderVs = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
export const shaderFs = `
  varying vec2 vUv;
  uniform float iTime;
  uniform vec3 iResolution;
  void main() {
    vec3 col = 0.5 + 0.5 * cos(iTime + vUv.xyx + vec3(0, 2, 4));
    gl_FragColor = vec4(col, 1.0);
  }
`


