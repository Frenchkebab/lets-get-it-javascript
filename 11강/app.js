const $wrapper = document.querySelector('#wrapper'); // 이 안에 카드 12장이 들어감

const total = 12;
const colors = ['red', 'orange', 'yellow', 'green', 'white', 'pink'];

let colorCopy = colors.concat(colors);
let shuffled = [];
let clicked = [];
let completed = []; // 짝을 맞춘 카드

// 피셔-예이츠 셔플로 카드 색상 배열을 섞어줌
function shuffle() {
  for (let i = 0; colorCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * colorCopy.length);
    shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1)); // push 대신 concat 사용
  }
}

// 카드 태그 생성 - 일종의 factory function 으로 볼 수도 있음!
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
  cardInner.appendChild(cardFront); // Front : 남색
  cardInner.appendChild(cardBack); // Back : 배열의 색상
  card.appendChild(cardInner);

  return card;
}

// 카드 태그에 달아줄 이벤트리스너 함수
function onClickCard() {
  // this는 클릭한 카드
  // 매개변수에 event를 넣어서 event.target.classList를 사용해도 됨!
  this.classList.toggle('flipped');
  clicked.push(this);
  if (clicked.length !== 2) {
    return;
  }
  // querySelector도 체이닝으로 여러개를 이어붙일 수 있음!
  const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
  const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;
  if (firstBackColor === secondBackColor) {
    // 두 카드의 색상이 같으면
    completed = completed.concat(clicked);
    clicked = [];

    if (completed.length !== total) {
      // 짝을 모두 맞추지 않은 경우, return해버림
      return;
    }

    // 짝을 모두 맞춘 경우 종료
    alert('축하합니다!');

    return;
  }
  // 두 카드의 색상이 다르면 다시 원래대로 뒤집음
  setTimeout(() => {
    clicked[0].classList.remove('flipped');
    clicked[1].classList.remove('flipped');
    clicked = [];
  }, 1000);
}

// 게임 시작 함수
function startGame() {
  shuffle(); // 색상들을 섞어줌 (아직 태그는 없음)

  // total개만큼 카드 생성
  for (let i = 0; i < total; i++) {
    const card = createCard(i); // 전체 개수만큼 카드 생성
    card.addEventListener('click', onClickCard); // 각 카드에 이벤트 리스너를 달아줌
    $wrapper.appendChild(card); // wrapper 태그에 추가해줌
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

startGame(); // 1. 카드 생성 -> 2. 카드 보여줬다가 숨기기
