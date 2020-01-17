// shadertoy样子
// void mainImage(out vec4 fragColor, in vec2 fragCoord) {
//   // Normalized pixel coordinates (from 0 to 1)
//   vec2 uv = fragCoord / iResolution.xy;

//   // Time varying pixel color
//   vec3 col = 0.5 + 0.5 * cos(iTime + uv.xyx + vec3(0, 2, 4));

//   // Output to screen
//   fragColor = vec4(col, 1.0);
// }

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


