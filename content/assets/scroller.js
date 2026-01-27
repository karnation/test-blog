(function () {
    const articles = Array.from(document.querySelectorAll('.article-entry'));

    articles.forEach((article, index) => {
        // No "Next" button on the last article
        if (index === articles.length - 1) return;

        const nextArticle = articles[index + 1];

        // Create button container
        const btn = document.createElement('button');
        btn.className = 'next-article-btn';
        btn.setAttribute('aria-label', 'Scroll to next article');

        // Add fish image
        const fish = document.createElement('img');
        fish.src = '/assets/1fish.PNG';
        fish.alt = '';
        btn.appendChild(fish);

        // Add "Next" label
        const label = document.createElement('span');
        label.innerText = 'Next';
        btn.appendChild(label);

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            nextArticle.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        article.appendChild(btn);
    });
})();
