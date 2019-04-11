/*
* Adapted from Squid Empire's space-age background at http://squidempire.com/micronode.html
* In turn Adapted Mr Doob's example particle site: https://threejs.org/examples/webgl_points_random.html
*/

var starscape = (function() {

var container;
var camera, scene, renderer, particles, geometry, materials = [], parameters, i, h, color, size;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

function begin() {
	init();
	animate();
}

function init() {

	container = document.getElementById("starscape");
	console.log(window.innerHeight);

	var fov = 60;
	var viewStart = 100;
	var viewEnd = 490;
	camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, viewStart, viewEnd);
	camera.position.z = 10;

	bean = scene = new THREE.Scene();
	//scene.fog = new THREE.FogExp2( 0x000000, 0.0007 );

	geometry = new THREE.Geometry();

	for ( i = 0; i < 3000; i++ ) {

		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * 1000 - 500;
		vertex.y = Math.random() * 1000 - 500;
		vertex.z = Math.random() * 1000 - 500;

		geometry.vertices.push( vertex );

	}

	parameters = [
		/* color[H, S, L], size */
		[ [1, 0.9, 0.9], 1 ],
		[ [0.95, 0.5, 1], 1.2 ],
		[ [0.90, 0.5, 1], 1 ],
		[ [0.85, 0.5, 1], 1 ],
		[ [0.80, 0.5, 0.1], 1 ],
		[ [1, 0, 1], 1 ]
	];

	for ( i = 0; i < parameters.length; i++ ) {

		color = parameters[i][0];
		size  = parameters[i][1];

		materials[i] = new THREE.PointsMaterial( { size: size } );
		

		particles = new THREE.Points( geometry, materials[i] );

		particles.rotation.x = Math.random() * 6;
		particles.rotation.y = Math.random() * 6;
		particles.rotation.z = Math.random() * 6;

		scene.add( particles );

	}

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove( event ) {

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;

	}

}

//

function animate() {

	requestAnimationFrame( animate );

	render();

}

function render() {

	var time = Date.now() * 0.00005;

	camera.position.x += ( mouseX - camera.position.x ) * 0.000005;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.000005;

	//camera.lookAt( scene.position );

	for ( i = 0; i < scene.children.length; i++ ) {

		var object = scene.children[ i ];

		if ( object instanceof THREE.Points ) {

			//object.rotation.y = time/3 * (i < 4 ? i + 1 : -(i + 1));
			object.rotation.y = time/180;

		}

	}

	for ( i = 0; i < materials.length; i++ ) {

		color = parameters[i][0];

		h = ( 360 * ( color[0] + time/3 ) % 360 ) / 360;
		materials[i].color.setHSL( h, color[1], color[2] );

	}

	renderer.render( scene, camera );

}

function shiftPointColour(point, time, i) {
	if ( object instanceof THREE.Points ) {

		object.rotation.y = time/300 * ( i < 4 ? i + 1 : - ( i + 1 ) );

	}

}

return {
	begin: begin,
	scene: scene,
};

})();
