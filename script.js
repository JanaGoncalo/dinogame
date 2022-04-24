const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
    
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 18;
          dino.style.bottom = position + 'px';
        }
      }, 18);
    } else {
      
      position += 18;
      dino.style.bottom = position + 'px';
    }
  }, 18);
}

function createAsteroides() {
  const asteroides = document.createElement('div');
  let asteroidesPosition = 3000;
  let randomTime = Math.random() * 8000;

  if (isGameOver) return;

  asteroides.classList.add('asteroides');
  background.appendChild(asteroides);
  asteroides.style.left = asteroidesPosition + 'px';

  let leftTimer = setInterval(() => {
    if (asteroidesPosition < -60) {
      
      clearInterval(leftTimer);
      background.removeChild(asteroides);
    } else if (asteroidesPosition > 0 && asteroidesPosition < 60 && position < 60) {
     
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      asteroidesPosition -= 20;
      asteroides.style.left = asteroidesPosition + 'px';
    }
  }, 40);

  setTimeout(createAsteroides, randomTime);
}

createAsteroides();
document.addEventListener('keyup', handleKeyUp);
