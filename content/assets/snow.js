(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width, height, snowflakes;

    function init() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        snowflakes = [];
        // Adjust density based on screen size
        const count = Math.floor((width * height) / 8000);
        for (let i = 0; i < count; i++) {
            snowflakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 0.5,
                speed: Math.random() * 1 + 0.3,
                wind: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (let flake of snowflakes) {
            ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        update();
        requestAnimationFrame(draw);
    }

    function update() {
        for (let flake of snowflakes) {
            flake.y += flake.speed;
            flake.x += flake.wind;
            if (flake.y > height) {
                flake.y = -flake.radius;
                flake.x = Math.random() * width;
            }
            if (flake.x > width) flake.x = 0;
            if (flake.x < 0) flake.x = width;
        }
    }

    window.addEventListener('resize', init);
    init();
    draw();
})();
