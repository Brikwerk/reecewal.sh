`
MIT License

Copyright (c) 2018 Garrett Johnson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`

import * as THREE from 'three';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';

export class ConditionalLineSegmentsGeometry extends LineSegmentsGeometry {

	fromConditionalEdgesGeometry( geometry ) {

		super.fromEdgesGeometry( geometry );

		const {
			direction,
			control0,
			control1,
		} = geometry.attributes;

		this.setAttribute( 'direction',
			new THREE.InterleavedBufferAttribute(
				new THREE.InstancedInterleavedBuffer( direction.array, 6, 1 ),
				3,
				0,
			),
		);

		this.setAttribute( 'control0',
			new THREE.InterleavedBufferAttribute(
				new THREE.InstancedInterleavedBuffer( control0.array, 6, 1 ),
				3,
				0,
			),
		);

		this.setAttribute( 'control1',
			new THREE.InterleavedBufferAttribute(
				new THREE.InstancedInterleavedBuffer( control1.array, 6, 1 ),
				3,
				0,
			),
		);

		return this;

	}

}
