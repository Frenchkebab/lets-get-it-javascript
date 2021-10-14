const $wrapper = document.querySelector('#wrapper'); // 이 안에 카드 12장이 들어감

const total = 12;
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];

let colorCopy = colors.concat(colors);
let shuffled = [];
let clicked = [];

// 피셔-예이츠 셔플
function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1)); // push 대신 concat 사용
  }
}

// 일종의 factory function 으로 볼 수도 있음!
function createCard(i) {
  const card = document.createElement('div');
  card.className = 'card'; // .card태그 생성

  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner'; // .card-inner 태그 생성

  const cardFront = document.createElement('div');
  cardFront.className = 'card-front'; // .card-front 태그 생성

  const cardBack = document.createElement('div');
  cardBack.className = 'card-back'; // .card-back 태그 생성
  cardBack.style.backgroundColor = shuffled[i]; // cardBack 태그 색상

  // div.card > div.cardInner > (div.card-front + div.card-back)
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card;
}

function startGame() {
  shuffle();

  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener('click', onClickCard);
    $wrapper.appendChild(card);
  }

  //초반 카드 공개
  document.querySelectorAll('.card').forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('flipped'); // .flipped class 추가
    }, 1000 + 100 * index);
  });

  // 카드 감추기
  setTimeout(() => {
    document.querySelectorAll('.card').forEach((card) => {
      card.classList.remove('flipped'); // .flipped class 제거
    });
  }, 5000);
}

function onClickCard() {
  this.classList.toggle('flipped');
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }
}

startGame();
