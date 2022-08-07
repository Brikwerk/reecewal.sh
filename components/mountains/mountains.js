import React, { Component } from 'react';
import { devEnv } from '../../core/DevEnv';

import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { DotScreenShader } from './DotScreenShader';

import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

import { OutsideEdgesGeometry } from './OutsideEdgesGeometry.js';
import { ConditionalEdgesGeometry } from './ConditionalEdgesGeometry.js';
import { ConditionalEdgesShader } from './ConditionalEdgesShader.js';
import { ConditionalLineSegmentsGeometry } from './Lines2/ConditionalLineSegmentsGeometry.js';
import { ConditionalLineMaterial } from './Lines2/ConditionalLineMaterial.js';

class Mountains extends Component {
    
    constructor(props) {

        super(props);
        this.mount = React.createRef();
        this.progressBar = React.createRef();
        this._isMounted = false;

        // globals
        this.params = {
            colors: 'LIGHT',
            backgroundColor: '#0d2a28',
            modelColor: '#0d2a28',
            lineColor: '#ffb400',
            shadowColor: '#44491f',

            lit: true,
            opacity: 1.00,
            threshold: 23,
            display: 'THRESHOLD_EDGES',
            displayConditionalEdges: true,
            thickness: 1,
            useThickLines: true,
            model: 'SMALL',

            randomize: () => this.randomizeColors(),
        };

        this.models = {};
        this.color = new THREE.Color();
        this.color2 = new THREE.Color();

        this.LIGHT_BACKGROUND = 0xfafafa;
        this.LIGHT_MODEL = 0xfafafa;
        this.LIGHT_LINES = 0x000000;
        this.LIGHT_SHADOW = 0xc1c1c1;

        this.DARK_BACKGROUND = 0x111111;
        this.DARK_MODEL = 0x111111;
        this.DARK_LINES = 0xb0bec5;
        this.DARK_SHADOW = 0x2c2e2f;

    }

    componentDidMount() {

        this._isMounted = true;

        this.init();
        this.animate();

    }

    randomizeColors() {

        const lineH = Math.random();
        const lineS = Math.random() * 0.2 + 0.8;
        const lineL = Math.random() * 0.2 + 0.4;

        const lineColor = '#' + color.setHSL( lineH, lineS, lineL ).getHexString();
        const backgroundColor = '#' + color.setHSL(
            ( lineH + 0.35 + 0.3 * Math.random() ) % 1.0,
            lineS * ( 0.25 + Math.random() * 0.75 ),
            1.0 - lineL,
        ).getHexString();

        this.color.set( lineColor );
        this.color2.set( backgroundColor );
        const shadowColor = '#' + color.lerp( this.color2, 0.7 ).getHexString();

        this.params.shadowColor = shadowColor;
        this.params.lineColor = lineColor;
        this.params.backgroundColor = backgroundColor;
        this.params.modelColor = backgroundColor;
        this.params.colors = 'CUSTOM';

    };

    updateModel() {

        this.originalModel = this.models[ this.params.model ];

        this.initEdgesModel();

        this.initBackgroundModel();

        this.initConditionalModel();

    }

    mergeObject( object ) {

        object.updateMatrixWorld( true );

        const geometry = [];
        object.traverse( c => {

            if ( c.isMesh ) {

                const g = c.geometry;
                g.applyMatrix4( c.matrixWorld );
                for ( const key in g.attributes ) {

                    if ( key !== 'position' && key !== 'normal' ) {

                        g.deleteAttribute( key );

                    }

                }
                geometry.push( g.toNonIndexed() );

            }

        } );

        const mergedGeometries = BufferGeometryUtils.mergeBufferGeometries( geometry, false );
        const mergedGeometry = BufferGeometryUtils.mergeVertices( mergedGeometries ).center();

        const group = new THREE.Group();
        const mesh = new THREE.Mesh( mergedGeometry );
        group.add( mesh );
        return group;

    }

    initBackgroundModel() {

        if ( this.backgroundModel ) {

            this.backgroundModel.parent.remove( this.backgroundModel );
            this.shadowModel.parent.remove( this.shadowModel );
            this.depthModel.parent.remove( this.depthModel );

            this.backgroundModel.traverse( c => {

                if ( c.isMesh ) {

                    c.material.dispose();

                }

            } );

            this.shadowModel.traverse( c => {

                if ( c.isMesh ) {

                    c.material.dispose();

                }

            } );

            this.depthModel.traverse( c => {

                if ( c.isMesh ) {

                    c.material.dispose();

                }

            } );

        }

        if ( ! this.originalModel ) {

            return;

        }

        this.backgroundModel = this.originalModel.clone();
        this.backgroundModel.traverse( c => {

            if ( c.isMesh ) {

                c.material = new THREE.MeshBasicMaterial( { color: this.LIGHT_MODEL } );
                c.material.polygonOffset = true;
                c.material.polygonOffsetFactor = 1;
                c.material.polygonOffsetUnits = 1;
                c.renderOrder = 2;

            }

        } );
        this.scene.add( this.backgroundModel );

        this.shadowModel = this.originalModel.clone();
        this.shadowModel.traverse( c => {

            if ( c.isMesh ) {

                c.material = new THREE.MeshToonMaterial( { color: this.LIGHT_MODEL } );
                c.material.polygonOffset = true;
                c.material.polygonOffsetFactor = 1;
                c.material.polygonOffsetUnits = 1;
                c.receiveShadow = false;
                c.renderOrder = 2;
                c.material.gradientMap = null;

            }

        } );
        this.scene.add( this.shadowModel );

        this.depthModel = this.originalModel.clone();
        this.depthModel.traverse( c => {

            if ( c.isMesh ) {

                c.material = new THREE.MeshBasicMaterial( { color: this.LIGHT_MODEL } );
                c.material.polygonOffset = true;
                c.material.polygonOffsetFactor = 1;
                c.material.polygonOffsetUnits = 1;
                c.material.colorWrite = false;
                c.renderOrder = 1;

            }

        } );
        this.scene.add( this.depthModel );

    }

    initEdgesModel() {

        // remove any previous model
        if ( this.edgesModel ) {

            this.edgesModel.parent.remove( this.edgesModel );
            this.edgesModel.traverse( c => {

                if ( c.isMesh ) {

                    if ( Array.isArray( c.material ) ) {

                        c.material.forEach( m => m.dispose() );

                    } else {

                        c.material.dispose();

                    }

                }

            } );

        }

        // early out if there's no model loaded
        if ( ! this.originalModel ) {

            return;

        }

        // store the model and add it to the scene to display
        // behind the lines
        this.edgesModel = this.originalModel.clone();
        this.scene.add( this.edgesModel );

        // early out if we're not displaying any type of edge
        if ( this.params.display === 'NONE' ) {

            this.edgesModel.visible = false;
            return;

        }

        const meshes = [];
        this.edgesModel.traverse( c => {

            if ( c.isMesh ) {

                meshes.push( c );

            }

        } );

        for ( const key in meshes ) {

            const mesh = meshes[ key ];
            const parent = mesh.parent;

            let lineGeom;
            if ( this.params.display === 'THRESHOLD_EDGES' ) {

                lineGeom = new THREE.EdgesGeometry( mesh.geometry, this.params.threshold );

            } else {

                const mergeGeom = mesh.geometry.clone();
                mergeGeom.deleteAttribute( 'uv' );
                mergeGeom.deleteAttribute( 'uv2' );
                lineGeom = new OutsideEdgesGeometry( BufferGeometryUtils.mergeVertices( mergeGeom, 1e-3 ) );

            }

            const line = new THREE.LineSegments( lineGeom, new THREE.LineBasicMaterial( { color: this.LIGHT_LINES } ) );
            line.position.copy( mesh.position );
            line.scale.copy( mesh.scale );
            line.rotation.copy( mesh.rotation );

            const thickLineGeom = new LineSegmentsGeometry().fromEdgesGeometry( lineGeom );
            const thickLines = new LineSegments2( thickLineGeom, new LineMaterial( { color: this.LIGHT_LINES, linewidth: 3 } ) );
            thickLines.position.copy( mesh.position );
            thickLines.scale.copy( mesh.scale );
            thickLines.rotation.copy( mesh.rotation );

            parent.remove( mesh );
            parent.add( line );
            parent.add( thickLines );

        }

    }

    initConditionalModel() {

        // remove the original model
        if ( this.conditionalModel ) {

            this.conditionalModel.parent.remove( this.conditionalModel );
            this.conditionalModel.traverse( c => {

                if ( c.isMesh ) {

                    c.material.dispose();

                }

            } );

        }

        // if we have no loaded model then exit
        if ( ! this.originalModel ) {

            return;

        }

        this.conditionalModel = this.originalModel.clone();
        this.scene.add( this.conditionalModel );
        this.conditionalModel.visible = false;

        // get all meshes
        const meshes = [];
        this.conditionalModel.traverse( c => {

            if ( c.isMesh ) {

                meshes.push( c );

            }

        } );

        for ( const key in meshes ) {

            const mesh = meshes[ key ];
            const parent = mesh.parent;

            // Remove everything but the position attribute
            const mergedGeom = mesh.geometry.clone();
            for ( const key in mergedGeom.attributes ) {

                if ( key !== 'position' ) {

                    mergedGeom.deleteAttribute( key );

                }

            }

            // Create the conditional edges geometry and associated material
            const lineGeom = new ConditionalEdgesGeometry( BufferGeometryUtils.mergeVertices( mergedGeom ) );
            const material = new THREE.ShaderMaterial( ConditionalEdgesShader );
            material.uniforms.diffuse.value.set( this.LIGHT_LINES );

            // Create the line segments objects and replace the mesh
            const line = new THREE.LineSegments( lineGeom, material );
            line.position.copy( mesh.position );
            line.scale.copy( mesh.scale );
            line.rotation.copy( mesh.rotation );

            const thickLineGeom = new ConditionalLineSegmentsGeometry().fromConditionalEdgesGeometry( lineGeom );
            const thickLines = new LineSegments2( thickLineGeom, new ConditionalLineMaterial( { color: this.LIGHT_LINES, linewidth: 2 } ) );
            thickLines.position.copy( mesh.position );
            thickLines.scale.copy( mesh.scale );
            thickLines.rotation.copy( mesh.rotation );

            parent.remove( mesh );
            parent.add( line );
            parent.add( thickLines );

        }

    }

    init() {

        // initialize renderer, scene, camera
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( this.LIGHT_BACKGROUND );

        let pixel_ratio = window.devicePixelRatio;
        let screen_width = this.mount.parentNode.offsetWidth / pixel_ratio;
        let screen_height = this.mount.parentNode.offsetHeight / pixel_ratio;

        this.camera = new THREE.PerspectiveCamera( 40, screen_width / screen_height, 0.1, 2000 );
        // this.camera.position.set( -1, 0.5, 2 ).multiplyScalar( 0.75 );
        this.camera.position.set( -0.9451, 0.1337, -1.0156 )
        this.scene.add( this.camera );

        this.renderer = new THREE.WebGLRenderer( { antialias: false, canvas: this.mount } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( Math.round(screen_width), Math.round(screen_height) );
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Floor
        this.floor = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(),
            new THREE.ShadowMaterial( { color: this.LIGHT_LINES, opacity: 0.25, transparent: true } )
        );
        this.floor.rotation.x = - Math.PI / 2;
        this.floor.scale.setScalar( 20 );
        this.floor.receiveShadow = true;
        this.scene.add( this.floor );

        // Lights
        const dirLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
        dirLight.position.set( 5, 7, 12 );
        dirLight.castShadow = true;
        dirLight.shadow.bias = -1e-10;
        dirLight.shadow.bias = 0.01
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;

        window.dirLight = dirLight;

        const shadowCam = dirLight.shadow.camera;
        shadowCam.left = shadowCam.bottom = -1;
        shadowCam.right = shadowCam.top = 1;

        this.scene.add( dirLight );

        // Progress bar
        this.loadingManager = new THREE.LoadingManager();
        this.loadingManager.onProgress = ( item, loaded, total ) => {
            this.progressBar.style.width = (loaded / total * 100) + '%';
        }

        // Object Loading
        let loader = new GLTFLoader( this.loadingManager );
        let dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/decoder/' );
        loader.setDRACOLoader( dracoLoader );

        this.models.SMALL = null;
        loader.load(
            '/assets/cl_model_small.glb',
            gltf => {

                const model = this.mergeObject( gltf.scene );
                model.children[ 0 ].geometry.computeBoundingBox();
                model.children[ 0 ].castShadow = true;

                this.models.SMALL = model;
                this.updateModel();

                this.mount.parentNode.style = "opacity: 100%";

            }
        );

        // camera controls
        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.maxDistance = 200;
        this.controls.target = new THREE.Vector3( -0.9484, 0.1333, -1.0122 );
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = -0.25;
        this.controls.update();

        window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

        // Post processing
        this.composer = new EffectComposer( this.renderer );
        this.composer.addPass( new RenderPass( this.scene, this.camera ) );

        this.dotscreen = new ShaderPass( DotScreenShader );
        this.dotscreen.uniforms[ 'scale' ].value = (screen_width / screen_height) * 2;
        this.dotscreen.uniforms[ 'yScale' ] = {value: screen_width / screen_height}
        this.composer.addPass( this.dotscreen );

        // Display FPS counter on Dev Mode
        if (devEnv) {
            this.stats = new Stats();
            this.mount.parentNode.append(this.stats.dom);
        }

    }

    onWindowResize() {

        if (this && this.mount && this.mount.parentNode) {
            let width = Math.round(this.mount.parentNode.offsetWidth / window.devicePixelRatio);
            let height = Math.round(this.mount.parentNode.offsetHeight / window.devicePixelRatio);

            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();

            this.dotscreen.uniforms[ 'yScale' ].value = width / height;
            this.dotscreen.uniforms[ 'scale' ].value = (width / height) * 2;

            this.renderer.setSize( width, height );
            this.renderer.setPixelRatio( window.devicePixelRatio );
        }

    }

    animate() {

        if (this._isMounted === true) {
            requestAnimationFrame( this.animate.bind(this) );
        }

        let linesColor = this.LIGHT_LINES;
        let modelColor = this.LIGHT_MODEL;
        let backgroundColor = this.LIGHT_BACKGROUND;
        let shadowColor = this.LIGHT_SHADOW;

        if ( this.params.colors === 'DARK' ) {

            linesColor = this.DARK_LINES;
            modelColor = this.DARK_MODEL;
            backgroundColor = this.DARK_BACKGROUND;
            shadowColor = this.DARK_SHADOW;

        } else if ( this.params.colors === 'CUSTOM' ) {

            linesColor = this.params.lineColor;
            modelColor = this.params.modelColor;
            backgroundColor = this.params.backgroundColor;
            shadowColor = this.params.shadowColor;

        }

        if ( this.conditionalModel ) {

            this.conditionalModel.visible = this.params.displayConditionalEdges;
            this.conditionalModel.traverse( c => {

                if ( c.material && c.material.resolution ) {

                    this.renderer.getSize( c.material.resolution );
                    c.material.resolution.multiplyScalar( window.devicePixelRatio );
                    c.material.linewidth = this.params.thickness;

                }

                if ( c.material ) {

                    c.visible = c instanceof LineSegments2 ? this.params.useThickLines : ! this.params.useThickLines;
                    c.material.uniforms.diffuse.value.set( linesColor );

                }

            } );

        }


        if ( this.edgesModel ) {

            this.edgesModel.traverse( c => {

                if ( c.material && c.material.resolution ) {

                    this.renderer.getSize( c.material.resolution );
                    c.material.resolution.multiplyScalar( window.devicePixelRatio );
                    c.material.linewidth = this.params.thickness;

                }

                if ( c.material ) {

                    c.visible = c instanceof LineSegments2 ? this.params.useThickLines : ! this.params.useThickLines;
                    c.material.color.set( linesColor );

                }

            } );

        }

        if ( this.backgroundModel ) {

            this.backgroundModel.visible = ! this.params.lit;
            this.backgroundModel.traverse( c => {

                if ( c.isMesh ) {

                    c.material.transparent = this.params.opacity !== 1.0;
                    c.material.opacity = this.params.opacity;
                    c.material.color.set( modelColor );

                }

            } );

        }

        if ( this.shadowModel ) {

            this.shadowModel.visible = this.params.lit;
            this.shadowModel.traverse( c => {

                if ( c.isMesh ) {

                    c.material.transparent = this.params.opacity !== 1.0;
                    c.material.opacity = this.params.opacity;
                    c.material.color.set( modelColor );
                    // c.material.shadowColor.set( shadowColor );

                }

            } );

        }

        if ( this.originalModel ) {

            this.floor.position.y = this.originalModel.children[ 0 ].geometry.boundingBox.min.y;

        }

        this.scene.background.set( backgroundColor );
        this.floor.material.color.set( shadowColor );
        this.floor.material.opacity = this.params.opacity;
        this.floor.visible = this.params.lit;

        this.renderScene();
        this.composer.render();
        this.controls.update();

        if (devEnv) {
            this.stats.update();
        }

    }

    renderScene() {

        this.renderer.render( this.scene, this.camera );

    }

    componentWillUnmount() {

        this._isMounted = false;
    }

    render() {
        return <div className='w-full h-full grid grid-cols-1 grid-rows-1'>
            <div className='col-start-1 row-start-1 w-full h-full touch-none opacity-0 transition-opacity duration-1000'>
                <canvas
                    id='mountains_canvas'
                    className='touch-action:none'
                    style={{imageRendering: 'pixelated', height: '100% !important', width: '100% !important'}}
                    ref={ref => this.mount = ref}
                />
            </div>
            <div className='col-start-1 row-start-1 -z-10 flex items-center w-full h-full'>
                <div className='m-auto pb-4'>
                    <div className='w-full h-2'>
                        <div
                            className='h-full w-0 bg-neutral-900 transition-all duration-300'
                            ref={ref => this.progressBar = ref}
                        ></div>
                    </div>
                    <div className='w-full text-center'>LOADING...</div>
                </div>
            </div>
        </div>
    }
}

export default Mountains;