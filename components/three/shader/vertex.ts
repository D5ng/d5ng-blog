const vertex = `
	uniform float uAmplitude;
	uniform float uWaveLength;
	uniform float uTime;
	varying vec2 vUv;

	void main(){
		vec3 newPosition = position;
		float wave = sin(position.x * uWaveLength + uTime) * uAmplitude;
		newPosition.z += wave;
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
	}

	// varying vec2 vUv;
	// void main() {
	// 	vec3 newPosition = position;
	// 	vUv = uv;
	// 	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
	// }

	// varying vec2 vUv;
	// void main() {
	// 	vUv = uv;
	// 	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	// }
`

export default vertex
