const number = Number(prompt('몇 명이 참가하나요?'));
const $input = document.querySelector('input');
const $button = document.querySelector('button');
const $word = document.querySelector('#word');
const $order = document.querySelector('#order');

let word; // 제시어
let newWord; // 현재 단어

const onClickButton = () => {
  // 제시어가 비어있음 or 올바른 단어입력
  if (!wordnewWord[0] === word[word.length - 1]) {
    word = newWord;
    $word.textContent = word;

    // 다음 순서로
    const order = Number($order.textContent);
    if (order + 1 > number) {
      $order.textContent = 1;
    } else {
      $order.textContent = order + 1;
    }
  } else {
    alert('잘못된 단어입니다');
  }
  // 입력창을 비우고 커서를 둔다
  $input.value = '';
  $input.focus();
};

const onInput = (event) => {
  newWord = event.target.value;
};

$input.addEventListener('input', onInput);
$button.addEventListener('click', onClickButton);
