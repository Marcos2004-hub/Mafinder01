var imageUrl = 'sua-imagem.png';

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
            var videoId = query.split('v=')[1] || query.split('/').pop();
            var ampersandPosition = videoId.indexOf('&');
            if (ampersandPosition !== -1) {
                videoId = videoId.substring(0, ampersandPosition);
            }

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
                    videoContainer.className = 'video-container';
                    videoContainer.style.border = '1px solid black';
                    videoContainer.style.padding = '10px';
                    videoContainer.style.marginTop = '10px';
                    videoContainer.style.display = 'flex';
                    videoContainer.style.flexDirection = 'column';
                    videoContainer.style.alignItems = 'center';
                    videoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                    videoContainer.style.borderRadius = '10px';
                    videoContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';

                    var img = document.createElement('img');
                    img.src = thumbnailUrl;
                    img.style.maxWidth = '150px';
                    img.style.marginBottom = '10px';
                    img.style.borderRadius = '10px';
                    videoContainer.appendChild(img);

                    var text = document.createElement('span');
                    text.textContent = videoTitle;
                    text.style.color = '#fff';
                    text.style.fontWeight = 'bold';
                    videoContainer.appendChild(text);

                    resultDiv.appendChild(videoContainer);

                    setTimeout(function() {
                        window.location.href = query;
                    }, 2000);
                });
        }
    }
});


var sidebar = document.querySelector('.sidebar');
var startX, startY, initialX, initialY;

sidebar.addEventListener('mousedown', function(e) {
    startX = e.clientX;
    startY = e.clientY;
    initialX = sidebar.offsetLeft;
    initialY = sidebar.offsetTop;
    sidebar.classList.add('movable');
    document.addEventListener('mousemove', moveSidebar);
    document.addEventListener('mouseup', stopMoveSidebar);
});

function moveSidebar(e) {
    var dx = e.clientX - startX;
    var dy = e.clientY - startY;
    sidebar.style.left = initialX + dx + 'px';
    sidebar.style.top = initialY + dy + 'px';
}

function stopMoveSidebar() {
    sidebar.classList.remove('movable');
    document.removeEventListener('mousemove', moveSidebar);
    document.removeEventListener('mouseup', stopMoveSidebar);
}
