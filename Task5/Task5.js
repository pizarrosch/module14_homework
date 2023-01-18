const Button = document.querySelector('.button2');
const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const mainDiv = document.querySelector('.result');

function showResult(receivedData) {
  let container = '';

  receivedData.forEach((item) => {
    const result = `
      <div class="result-container">
        <img 
          src='${item.download_url}'
          width="500"
          height="333"
        >
      </div>
    `
    container += result;
  })
  mainDiv.innerHTML += container;
  input1.value = '';
  input2.value = '';
}

function returnResult() {
  if (mainDiv.innerHTML !== '') {
    mainDiv.innerHTML = '';
  }

  const input1Check = input1.value < 1 || input1.value > 10 || isNaN(input1.value);
  const input2Check = input2.value < 1 || input2.value > 10 || isNaN(input2.value);

  if (input1Check && input2Check) {
    mainDiv.innerHTML = `<p class="errorStyle">Номер страницы и лимит вне диапазона от 1 до 10</p>`;
    input1.style.backgroundColor = '#e77c5a';
    input2.style.backgroundColor = '#e77c5a';
  } else if (input1Check) {
    mainDiv.innerHTML = `<p class="errorStyle">Номер страницы вне диапазона от 1 до 10</p>`;
    input1.style.backgroundColor = '#e77c5a';
  } else if (input2Check) {
    mainDiv.innerHTML = `<p class="errorStyle">Лимит вне диапазона от 1 до 10</p>`;
    input2.style.backgroundColor = '#e77c5a';
  } else {
    fetch(`https://picsum.photos/v2/list?page=${input1.value}&limit=${input2.value}`)
      .then(response => response.json())
      .then(json => {
        showResult(json);
        localStorage.setItem('result', JSON.stringify(json))
      })
      .catch(error => mainDiv.innerHTML = error.message)
  }
}

const parsedData = JSON.parse(localStorage.getItem('result'));

window.onload = () => showResult(parsedData);

function handleKeyDown(e) {
  if (e.key === 'Enter') {
    returnResult();
  }
}

function handleContentCheck() {
  if (mainDiv.innerHTML.includes('вне')) {
    mainDiv.innerHTML = '';
    input1.value = '';
    input2.value = '';
    input1.style.backgroundColor = 'transparent';
    input2.style.backgroundColor = 'transparent';
  }
}

Button.onclick = returnResult;
input1.onkeydown = handleKeyDown;
input2.onkeydown = handleKeyDown;
input1.onclick = handleContentCheck;
input2.onclick = handleContentCheck;

