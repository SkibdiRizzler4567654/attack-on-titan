let scene, camera, renderer, player, clock, grapplingHook, grappleTarget, swingVelocity;
let isGrappling = false;
let isSwinging = false;
let grapplePoint = new THREE.Vector3();

function init() {
    // Create the scene and camera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Add a simple player (represented as a sphere for now)
    player = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }));
    player.position.set(0, 5, 0); // Start the player a bit above the ground
    scene.add(player);

    // Set camera position
    camera.position.z = 10;

    // Set up the clock for smooth time-based movement
    clock = new THREE.Clock();

    // Create a basic grapple hook (this is just a line for now)
    grapplingHook = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([player.position, player.position]),
        new THREE.LineBasicMaterial({ color: 0xff0000 })
    );
    scene.add(grapplingHook);

    // Create the ground (representing a simple environment for now)
    let ground = new THREE.Mesh(
        new THREE.PlaneGeometry(1000, 1000),
        new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide })
    );
    ground.rotation.x = Math.PI / 2;
    scene.add(ground);

    // Handle keypress for starting grappling
    window.addEventListener('keydown', onKeyDown);

    // Start the animation loop
    animate();
}

// Handle key inputs (spacebar to grapple)
function onKeyDown(event) {
    if (event.code === 'Space') {
        if (!isGrappling) {
            initiateGrapple();
        } else if (isGrappling && !isSwinging) {
            startSwing();
        }
    }
}

// Initiate grappling
function initiateGrapple() {
    // Calculate a random grapple point in the environment (for now, just a random point)
    let targetX = Math.random() * 50 - 25;
    let targetZ = Math.random() * 50 - 25;
    grapplePoint.set(targetX, 5, targetZ); // A height of 5 meters above the ground

    isGrappling = true;
    grapplingHook.geometry.setFromPoints([player.position, grapplePoint]);

    console.log('Grapple to:', grapplePoint);
}

// Start swinging when the grapple hook connects
function startSwing() {
    isSwinging = true;
    swingVelocity = 0.1; // Swing speed, can be adjusted for more control
    console.log('Swinging!');
}

// Update player and camera position
function updatePlayerMovement() {
    if (isGrappling) {
        // Move player toward the grapple point
        let direction = new THREE.Vector3().subVectors(grapplePoint, player.position);
        if (direction.length() > 0.5) {
            direction.normalize();
            player.position.add(direction.multiplyScalar(0.1)); // Move player towards grapple point
        } else {
            console.log('Reached grapple point!');
            isGrappling = false;
            if (!isSwinging) {
                startSwing();
            }
        }
    }

    if (isSwinging) {
        // Simulate swinging (this is very basic)
        let swingDirection = new THREE.Vector3().subVectors(grapplePoint, player.position);
        swingDirection.normalize();
        player.position.add(swingDirection.multiplyScalar(swingVelocity));

        // Gravity effect (simple downward pull)
        player.position.y -= 0.05;

        // Adjust the camera to follow the player dynamically
        camera.position.set(player.position.x, player.position.y + 5, player.position.z + 10);
        camera.lookAt(player.position);
    }
}

function animate() {
    requestAnimationFrame(animate);
    let delta = clock.getDelta(); // Get the time difference between frames

    updatePlayerMovement();

    // Render the scene
    renderer.render(scene, camera);
}

// Initialize the game
init();
