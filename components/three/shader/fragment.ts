const fragment = `
  uniform sampler2D uTexture;
  uniform vec2 vUvScale;
  varying vec2 vUv;

  void main() {
    vec2 uv = (vUv - 0.5) * vUvScale + 0.5;
    vec4 color = texture(uTexture, uv);
	  gl_FragColor = color;
  }
`
export default fragment
// const fragment = `
//   uniform vec2 mouse;
//   uniform float bulgeStrength;

//   uniform sampler2D uTexture;
//   uniform vec2 vUvScale;
//   varying vec2 vUv;

//   // void main() {
//   //   vec2 uv = vUv;
//   //   vec2 p = mouse;
//   //   float d = distance(uv, p);

//   //   if (d < 0.5) {
//   //     float percent = 1.0 - d / 0.5;
//   //     percent = pow(percent, 3.0);
//   //     vec2 offset = (uv - p) * percent * bulgeStrength;
//   //     uv += offset;
//   //   }

//   //   gl_FragColor = texture2D(uTexture, uv);
//   // }

// vec2 bulge(vec2 uv, vec2 center) {
//   uv -= center;

//   float dist = length(uv) / 0.6;
//   float distPow = pow(dist, 2.);
//   float strengthAmount = 1.1 / (1.0 + distPow);
//   uv *= strengthAmount;

//   uv += center;

//   return uv;
// }

//   void main() {
//     vec2 bulgeUV = bulge(vUv, mouse);
//     vec4 tex = texture2D(uTexture, bulgeUV);
//     gl_FragColor.rgb = tex.rgb;
//     gl_FragColor.a = 1.0;
//   }
// `
