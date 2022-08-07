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

import { BufferGeometry, Vector3, BufferAttribute } from 'three';

const vec = new Vector3();
export class OutsideEdgesGeometry extends BufferGeometry {

	constructor( geometry ) {

		super();

		const edgeInfo = {};
		const index = geometry.index;
		const position = geometry.attributes.position;
		for ( let i = 0, l = index.count; i < l; i += 3 ) {

			const indices = [
				index.getX( i + 0 ),
				index.getX( i + 1 ),
				index.getX( i + 2 ),
			];

			for ( let j = 0; j < 3; j ++ ) {

				const index0 = indices[ j ];
				const index1 = indices[ ( j + 1 ) % 3 ];

				const hash = `${ index0 }_${ index1 }`;
				const reverseHash = `${ index1 }_${ index0 }`;
				if ( reverseHash in edgeInfo ) {

					delete edgeInfo[ reverseHash ];

				} else {

					edgeInfo[ hash ] = [ index0, index1 ];

				}

			}

		}

		const edgePositions = [];
		for ( const key in edgeInfo ) {

			const [ i0, i1 ] = edgeInfo[ key ];

			vec.fromBufferAttribute( position, i0 );
			edgePositions.push( vec.x, vec.y, vec.z );

			vec.fromBufferAttribute( position, i1 );
			edgePositions.push( vec.x, vec.y, vec.z );

		}

		this.setAttribute( 'position', new BufferAttribute( new Float32Array( edgePositions ), 3, false ) );

	}

}
