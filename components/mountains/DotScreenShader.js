import {
	Vector2
} from 'three';

/**
 * Dot screen shader
 * based on glfx.js sepia shader
 * https://github.com/evanw/glfx.js
 * 
 * Original code sourced from Three.js
 * under the MIT License
 * Copyright © 2010-2022 three.js authors
 * 
 * Modified by Reece Walsh
 */

const DotScreenShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'tSize': { value: new Vector2( 330, 330 ) },
		'center': { value: new Vector2( 0.5, 0.5 ) },
		'angle': { value: 1.57 },
		'scale': { value: 1.0 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform vec2 center;
		uniform float angle;
		uniform float scale;
		uniform vec2 tSize;
		uniform float yScale;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		float pattern() {

			float s = sin( angle ), c = cos( angle );

			float u = vUv.x;
			// Scale Y so that dots remain a uniform size
			// on narrow or wide screens
        	float v = (vUv.y) / yScale;

			vec2 tex = vec2(u, v) * tSize - center;
			vec2 point = vec2( c * tex.x - s * tex.y, s * tex.x + c * tex.y ) * scale;

			return ( sin( point.x ) * cos( point.y ) ) * 4.0;

		}

		void main() {

			vec4 color = texture2D( tDiffuse, vUv );

			float average = ( color.r + color.g + color.b ) / 3.0;

			gl_FragColor = vec4( vec3( average * 10.0 - 3.25 + pattern() ), color.a );

		}`

};

export { DotScreenShader };