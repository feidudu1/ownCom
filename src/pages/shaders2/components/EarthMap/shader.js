// 飞线
export const flyLineVertexShader = `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;
export const flyLineFragmentShader = `
  varying vec2 vUv;
  uniform float time;
  void main(){
    gl_FragColor = vec4(1.0, 0.84314, 0.0, sin(4.0 * (time + vUv.x)));
    if(gl_FragColor.a < 0.1) discard;
  }
`;
