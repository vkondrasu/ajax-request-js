(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, {
            headers: {
                Authorization: 'Client-ID cdd94abbc93d118b425fc25ceef47163754c2ddd6bc792acee63af6eb2913595'
            }
        }).then(response => response.json()).then(addImage);

        function addImage(images) {

            let htmlContent = '';

            if (images && images.results && images.results[0]) {
                let firstImage = images.results[0];
                htmlContent = `<figure> 
			<img src="${firstImage.urls.regular}" alt="${searchedForText}">
			<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
		</figure>`;
            } else {
                htmlContent = '<div class="error-no-image"> No image is available </div>';
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=96d67d8bce2a48b89a351b75d39e8c3a`).then(response => response.json()).then(addArticles);

        function addArticles(data) {
            let htmlContent = '';

            if (data && data.response && data.response && data.response.docs && data.response.docs.length > 1) {
                htmlContent = '<ul>' + data.response.docs.map(article => `<li class="article"> 
			<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
			
			<p> ${article.snippet} </p>
			</li>
			`).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles"> No article is available </div>';
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }


    });
})();