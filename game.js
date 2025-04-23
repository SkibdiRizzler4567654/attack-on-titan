let scene, camera, renderer;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create renderer and add it to the DOM
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('game-container').appendChild(renderer.domElement);

    // Create a simple cube for testing (could be your ODM gear later)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set camera position
    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate cube for demo (you'll replace this with your game logic)
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        // Render scene
        renderer.render(scene, camera);
    }

    animate();
}

// Initialize the game
init();
