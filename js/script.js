

document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var query = document.getElementById('searchInput').value.trim();
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    
    if (!navigator.onLine) {
        startFlappyBirdGame();
        return;  
    }

    var urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i;
    var completeUrlPattern = /^(https?:\/\/)/i;

    var youtubePattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

    if (urlPattern.test(query)) {
        if (!completeUrlPattern.test(query)) {
            query = 'https://' + query;  
        }

        
        if (completeUrlPattern.test(query)) {
            var img = document.createElement('img');
            img.src = 'https://www.google.com/s2/favicons?domain=' + new URL(query).hostname;
            resultDiv.appendChild(img);

            var text = document.createElement('span');
            text.textContent = 'Redirecionando para ' + new URL(query).hostname;
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


function startFlappyBirdGame() {
    document.getElementById('gameContainer').style.display = 'block';
    var bird = document.getElementById('bird');
    var birdY = 200;
    var gravity = 2;
    var lift = -30;
    var velocity = 0;

   
    document.addEventListener('keydown', function() {
        velocity = lift;  
    });

    function gameLoop() {
        velocity += gravity;
        birdY += velocity;
        if (birdY < 0) birdY = 0;  
        if (birdY > 370) birdY = 370;  
        bird.style.top = birdY + 'px';

        requestAnimationFrame(gameLoop);
    }

    gameLoop();  
}
