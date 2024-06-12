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
