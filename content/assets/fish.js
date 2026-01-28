(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'fish-canvas';
    // Insert at the beginning of the .page element (or body as fallback)
    // This puts the canvas in the same stacking context as the content,
    // which allows mix-blend-mode (difference) to work correctly.
    const target = document.querySelector('.page') || document.body;
    target.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let width, height, fishes;
    const fishImages = [];
    const fishFiles = ['1fish.PNG', '2fish.PNG', '3fish.PNG', '4fish.PNG', '5fish.PNG', '6fish.PNG'];
    let loadedImages = 0;

    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        if (loadedImages === fishFiles.length) {
            createFishes();
        }
    }

    function createFishes() {
        fishes = [];
        const count = 8; // Number of fish
        for (let i = 0; i < count; i++) {
            const img = fishImages[Math.floor(Math.random() * fishImages.length)];
            const scale = Math.random() * 0.2 + 0.1; // Scale down the large PNGs
            const direction = Math.random() > 0.5 ? 1 : -1;

            fishes.push({
                img: img,
                x: Math.random() * width,
                y: Math.random() * height,
                speed: (Math.random() * 0.5 + 0.2) * direction,
                scale: scale,
                w: img.width * scale,
                h: img.height * scale,
                direction: direction,
                opacity: Math.random() * 0.3 + 0.3 // Subtle presence
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        if (!fishes) return;

        for (let fish of fishes) {
            ctx.save();
            ctx.globalAlpha = fish.opacity;

            // Move to fish center for flipping
            ctx.translate(fish.x + fish.w / 2, fish.y + fish.h / 2);
            if (fish.direction === -1) {
                ctx.scale(-1, 1);
            }

            ctx.drawImage(fish.img, -fish.w / 2, -fish.h / 2, fish.w, fish.h);
            ctx.restore();
        }
        update();
        requestAnimationFrame(draw);
    }

    function update() {
        if (!fishes) return;
        for (let fish of fishes) {
            fish.x += fish.speed;

            // Gentle bobbing
            fish.y += Math.sin(Date.now() / 1000 + fishes.indexOf(fish)) * 0.2;

            // Wrap around
            if (fish.speed > 0 && fish.x > width) {
                fish.x = -fish.w;
                fish.y = Math.random() * height;
            } else if (fish.speed < 0 && fish.x < -fish.w) {
                fish.x = width;
                fish.y = Math.random() * height;
            }
        }
    }

    console.log('Fish background script initialized');
    // Load all images
    const scriptTag = document.currentScript;
    const assetBase = scriptTag ? scriptTag.src.substring(0, scriptTag.src.lastIndexOf('/') + 1) : '/assets/';
    console.log('Fish assets base path detected as:', assetBase);

    // Fix the logo path dynamically for subdirectory deployments
    const logo = document.getElementById('site-logo');
    if (logo) {
        logo.src = assetBase + 'doctornowhere.jpg';
        console.log('Logo path fixed to:', logo.src);

        // Toggle inversion on mouseenter
        logo.addEventListener('mouseenter', () => {
            logo.classList.toggle('is-inverted');
        });
    }

    fishFiles.forEach((file, index) => {
        const img = new Image();
        img.src = assetBase + file;
        img.onload = () => {
            console.log('Successfully loaded fish:', file);
            loadedImages++;
            fishImages.push(img);
            if (loadedImages === fishFiles.length) {
                console.log('All fish images loaded. Initializing animation.');
                init();
                draw();
            }
        };
        img.onerror = () => {
            console.error('FAILED to load fish image:', file, 'from', img.src);
            loadedImages++;
            if (loadedImages === fishFiles.length) {
                init();
                draw();
            }
        };
    });

    window.addEventListener('resize', init);
})();
