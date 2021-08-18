const num = Number(prompt('몇 명이 참가하나요?'));

if (num) {
  const $order = document.querySelector('#order');
  const $word = document.querySelector('#word');
  const $input = document.querySelector('input');
  const $button = document.querySelector('button');

  // 제시어
  let word;
  let newWord;

  const onClickButton = () => {
    if (newWord.length === 3 && (!word || word[word.length - 1] === newWord[0])) {
      word = newWord;
      $word.textContent = word;
      // order : 현재 참가자
      const order = Number($order.textContent);
      if (order + 1 > num) {
        $order.textContent = 1;
      } else {
        $order.textContent = order + 1;
      }
    } else {
      alert('잘못된 단어입니다');
    }
    $input.value = '';
    $input.focus();
  };

  const onInput = (event) => {
    newWord = event.target.value;
  };

  $button.addEventListener('click', onClickButton);
  $input.addEventListener('input', onInput);
}
