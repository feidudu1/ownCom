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

#define FROSTYNESS 2.0
#define COLORIZE   1.0
#define COLOR_RGB  0.0,0.0,1.0

float rand(vec2 uv) {
 
    float a = dot(uv, vec2(92., 80.));
    float b = dot(uv, vec2(41., 62.));
    
    float x = sin(a) + cos(b) * 51.;
    return fract(x);
}

void main( ) {
		vec2 uv = vUv;
    vec4 d = texture2D(tNoise, uv);
		vec2 rnd = vec2(rand(uv+d.r*.05), rand(uv+d.b*.05));
    
    //vignette
    const vec2 lensRadius	= vec2(0.65*1.5, 0.05);
    float dist = distance(uv.xy, vec2(0.5,0.5));
    float vigfin = pow(1.-smoothstep(lensRadius.x, lensRadius.y, dist),2.);
   
    rnd *= .025*vigfin+d.rg*FROSTYNESS*vigfin;
    uv += rnd;
    // gl_FragColor = vec4(COLOR_RGB,1.0);
    gl_FragColor = mix(texture2D(tDiffuse, uv),vec4(COLOR_RGB,1.0),COLORIZE*vec4(rnd.r));
}


`
