const number = Number(prompt('몇 명이 참가하나요?'));
const $input = document.querySelector('input');
const $button = document.querySelector('button');

const onInput = (event) => {
  console.log('글자 입력', event.target.value);
};

const onClickButton = () => {
  console.log('버튼 클릭');
};

$input.addEventListener('input', onInput);
$button.addEventListener('click', onClickButton);
