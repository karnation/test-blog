// Generate repeating clovers for left and right borders
(function () {
    const assetElement = document.getElementById('clover-asset');
    const cloverSrc = assetElement ? assetElement.src : '/assets/newtransparent-clover.PNG';
    const cloverSize = 66.67; // px
    const viewportHeight = window.innerHeight;
    const cloversNeeded = Math.ceil(viewportHeight / cloverSize) + 2; // Extra for scrolling

    // Create left column
    const leftColumn = document.createElement('div');
    leftColumn.className = 'clover-left';
    for (let i = 0; i < cloversNeeded; i++) {
        const img = document.createElement('img');
        img.src = cloverSrc;
        img.alt = '';
        leftColumn.appendChild(img);
    }

    // Create right column
    const rightColumn = document.createElement('div');
    rightColumn.className = 'clover-right';
    for (let i = 0; i < cloversNeeded; i++) {
        const img = document.createElement('img');
        img.src = cloverSrc;
        img.alt = '';
        rightColumn.appendChild(img);
    }

    document.body.appendChild(leftColumn);
    document.body.appendChild(rightColumn);

    const body = document.body;
    const isMobile = window.matchMedia
        ? window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches
        : window.innerWidth <= 768;
    if (isMobile) {
        body.classList.add('animations-paused');
        body.classList.add('clovers-hidden');
    }

    // Handle toggle button
    const toggleBtn = document.getElementById('clover-toggle');
    if (toggleBtn) {
        // Ensure button image uses the correct src if we found it from the hidden element
        const btnImg = toggleBtn.querySelector('img');
        if (btnImg && cloverSrc) {
            btnImg.src = cloverSrc;
        }

        toggleBtn.addEventListener('click', () => {
            if (!body.classList.contains('animations-paused') && !body.classList.contains('clovers-hidden')) {
                // State 0 -> State 1: Pause
                body.classList.add('animations-paused');
            } else if (body.classList.contains('animations-paused') && !body.classList.contains('clovers-hidden')) {
                // State 1 -> State 2: Hide (keep paused so button doesn't spin)
                body.classList.add('clovers-hidden');
            } else {
                // State 2 (or mixed) -> State 0: Reset
                body.classList.remove('animations-paused');
                body.classList.remove('clovers-hidden');
            }
        });
    }
})();
