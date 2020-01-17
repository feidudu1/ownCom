export const shaderVs = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
export const shaderFs = `
  uniform float iTime;

  uniform sampler2D tDiffuse;
  uniform sampler2D tNoise;
  varying vec2 vUv;
  uniform vec3 iResolution;

#define FLIP_IMAGE

float rand(vec2 uv) {
 
    float a = dot(uv, vec2(92., 80.));
    float b = dot(uv, vec2(41., 62.));
    
    float x = sin(a) + cos(b) * 51.;
    return fract(x);
    
}

void main()
{
	vec2 uv = vUv;
	vec2 rnd = vec2(rand(uv), rand(uv));
    
    uv += rnd * .05;
    gl_FragColor = texture2D(tDiffuse, uv);
}


`
