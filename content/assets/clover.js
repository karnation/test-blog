// Generate repeating clovers for left and right borders
(function () {
    const cloverSrc = '/assets/newtransparent-clover.PNG';
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
})();
