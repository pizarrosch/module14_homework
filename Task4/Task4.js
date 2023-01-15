const submitButton = document.querySelector('.button2');
const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const mainDiv = document.querySelector('.result');

function showResult(item) {
  mainDiv.innerHTML = `
      <div class="result-container">
        <img 
          src='${item}'>
      </div>
    `
}

function returnResult() {
  if (input1.value < 100 || input1.value > 300) {
    mainDiv.innerHTML = `<p class="errorStyle">Введите число от 100 до 300</p>`;
  } else if (input2.value < 100 || input2.value > 300) {
    mainDiv.innerHTML = `<p class="errorStyle">Введите число от 100 до 300</p>`;
  } else if (isNaN(input1.value) || isNaN(input2.value)) {
    mainDiv.innerHTML = `<p class="errorStyle">Пожалуйста, введите число</p>`;
  } else {
    fetch(`https://picsum.photos/${input1.value}/${input2.value}`)
      .then(response => {
        showResult(response.url);
        input1.value = '';
        input2.value = '';
      })
      .catch(error => mainDiv.innerHTML = error.message)
  }
}

function handleResultOnEnter(e) {
  if (e.key === 'Enter') {
    returnResult();
  }
}

submitButton.addEventListener('click', returnResult)
input2.onkeydown = handleResultOnEnter;
input1.onclick = () => {
  if (mainDiv.innerHTML.includes('число')) {
    mainDiv.innerHTML = '';
  }
  input1.value = '';
  input2.value = '';
}


