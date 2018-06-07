(function App () {
    const canvas = document.getElementById('canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 0);
    const controls = new THREE.OrbitControls( camera );

    camera.position.set(0, 0, 1000);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1, 1000, 2);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 512;  // default
    pointLight.shadow.mapSize.height = 512; // default
    pointLight.shadow.camera.near = 0.5;       // default
    pointLight.shadow.camera.far = 500;
    pointLight.position.set( 0, 0, 0 );

    const squares= [];
    for (let i = 0; i < 30; i++) {
        const isOdd = (Math.floor(i / 2) - i / 2) === 0;
        const size =  i * 5 + 30;
        const square = new THREE.BoxGeometry( 1, size, size );
        const material = new THREE.MeshLambertMaterial({ color: 0xFFFFCC, transparent: false });
        material.transparent = false;
        material.color.setRGB(Math.random(), Math.random(), Math.random());
        square.castShadow = true; //default is false
        square.receiveShadow = true;
        let mesh = new THREE.Mesh(square, material);
        mesh.position.x = isOdd ? i * 20 + Math.random() * 20 : -(i * 20 + Math.random() * 20);
        mesh.position.y = Math.random() > 0.5 ? Math.random() * 150 : -Math.random() * 150;
        mesh.renderOrder = i;
        mesh.position.z = 0;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        squares.push(mesh);
    }

    scene.add(ambientLight);
    scene.add(pointLight);
    scene.add(...squares);

    const sphere = new THREE.SphereGeometry(15, 6, 6);
    const sphereMaterial = new THREE.MeshLambertMaterial( {color: 0xcc00ff, wireframe: true} );
    let sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
    scene.add(sphereMesh);


    function loop () {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(function () {
            loop();
        })
    }

    loop();
})();