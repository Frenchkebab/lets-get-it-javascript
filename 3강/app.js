const number = Number(prompt('몇 명이 참가하나요?'));
const $input = document.querySelector('input');
const $button = document.querySelector('button');
const $word = document.querySelector('#word');
const $order = document.querySelector('#order');

let word; // 제시어
let newWord; // 현재 단어

const onClickButton = () => {
  if (!word) {
    // 제시어가 비어있는가? Yes
    word = newWord;
    $word.textContent = word;
    const order = Number($order.textContent);
    if (order + 1 > number) {
      $order.textContent = 1;
    } else {
      $order.textContent = order + 1;
    }
    // 입력창을 비우고 커서를 둔다
    $input.value = '';
    $input.focus();
  } else {
    // 제시어가 비어있는가? No
    if (newWord[0] === word[word.length - 1]) {
      // 새로 입력된 단어가 올바른가? Yes
      const order = Number($order.textContent);
      if (order + 1 > number) {
        $order.textContent = 1;
      } else {
        $order.textContent = order + 1;
      }
      word = newWord;
      $word.textContent = word;
      // 입력창을 비우고 커서를 둔다
      $input.value = '';
      $input.focus();
    } else {
      // 새로 입력된 단어가 올바른가? No
      alert('잘못된 단어입니다');
      // 입력창을 비우고 커서를 둔다
      $input.value = '';
      $input.focus();
    }
  }
};

const onInput = (event) => {
  newWord = event.target.value;
};

$input.addEventListener('input', onInput);
$button.addEventListener('click', onClickButton);
