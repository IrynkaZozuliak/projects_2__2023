document.addEventListener('DOMContentLoaded', function() {
    const field = document.getElementById('field');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('startButton');
  
    let score = 0;
    let gameStarted = false;
    let gameTimer;
    let butterflies = [
      'butterfly1.png',
      'butterfly2.png',
      'butterfly3.png'
    ];
  
    startButton.addEventListener('click', function() {
      if (!gameStarted) {
        startGame();
        startButton.textContent = 'Зупинити';
      } else {
        stopGame();
        startButton.textContent = 'Старт';
      }
    });
  
    function startGame() {
      gameStarted = true;
      score = 0;
      scoreElement.textContent = 'Счет: ' + score;
  
      gameTimer = setInterval(addButterfly, 1000);
      field.addEventListener('click', catchButterfly);
    }
  
    function stopGame() {
      gameStarted = false;
      clearInterval(gameTimer);
      field.removeEventListener('click', catchButterfly);
      removeAllButterflies();
    }
  
    function addButterfly() {
      const butterflyImage = getRandomButterfly();
      const butterfly = document.createElement('div');
      butterfly.className = 'butterfly';
      butterfly.style.left = getRandomPosition() + 'px';
      butterfly.style.top = getRandomPosition() + 'px';
      butterfly.style.backgroundImage = `url('${butterflyImage}')`;
      field.appendChild(butterfly);
  
      setTimeout(function() {
        if (butterfly.parentNode === field) {
          field.removeChild(butterfly);
        }
      }, 3000);
    }
  
    function getRandomButterfly() {
      const index = Math.floor(Math.random() * butterflies.length);
      return butterflies[index];
    }
  
    function getRandomPosition() {
      const fieldSize = 400;
      const butterflySize = 50;
      return Math.floor(Math.random() * (fieldSize - butterflySize));
    }
  
    function catchButterfly(event) {
      if (event.target.classList.contains('butterfly')) {
        event.target.parentNode.removeChild(event.target);
        score++;
        scoreElement.textContent = 'Счет: ' + score;
      }
    }
  
    function removeAllButterflies() {
      const butterflies = field.getElementsByClassName('butterfly');
      while (butterflies.length > 0) {
        butterflies[0].parentNode.removeChild(butterflies[0]);
      }
    }
  });
  