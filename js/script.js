
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var query = document.getElementById('searchInput').value.trim();
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    var urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
    var completeUrlPattern = /^(https?:\/\/)/i;
    var youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    if (urlPattern.test(query)) {
        if (!completeUrlPattern.test(query)) {
            query = 'http://' + query;
        }

        var img = document.createElement('img');
        img.src = 'https://www.google.com/s2/favicons?domain=' + new URL(query).hostname;
        resultDiv.appendChild(img);

        if (youtubePattern.test(query)) {
            var videoId = null;

            if (query.includes('youtu.be')) {
                videoId = query.split('/').pop().split('?')[0];
            } else if (query.includes('youtube.com')) {
                var urlParams = new URLSearchParams(new URL(query).search);
                videoId = urlParams.get('v');
            }

            if (videoId) {
                var thumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
                var apiUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoId + '&key=AIzaSyAH121LnYi033eATvjq5HLf4t6cHMpid14';

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        var videoTitle = data.items[0].snippet.title;

                        var redirectText = document.createElement('span');
                        redirectText.textContent = 'Redirecionando para YouTube';
                        resultDiv.appendChild(redirectText);

                        var videoContainer = document.createElement('div');
                        videoContainer.style.border = '1px solid black';
                        videoContainer.style.padding = '10px';
                        videoContainer.style.marginTop = '10px';
                        videoContainer.style.display = 'inline-block';

                        var img = document.createElement('img');
                        img.src = thumbnailUrl;
                        img.style.maxWidth = '150px';
                        img.style.marginRight = '10px';
                        videoContainer.appendChild(img);

                        var text = document.createElement('span');
                        text.textContent = videoTitle;
                        videoContainer.appendChild(text);

                        resultDiv.appendChild(videoContainer);

                        setTimeout(function() {
                            window.location.href = query;
                        }, 2000);
                    });
            } else {
                var text = document.createElement('span');
                text.textContent = 'URL do YouTube inválida';
                resultDiv.appendChild(text);
            }
        } else {
            var text = document.createElement('span');
            var siteName = new URL(query).hostname.replace('www.', '');
            text.textContent = 'Redirecionando para ' + siteName;
            resultDiv.appendChild(text);

            setTimeout(function() {
                window.location.href = query;
            }, 2000);
        }
    } else {
        var searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
        window.location.href = searchUrl;
    }
});
