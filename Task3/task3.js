const input = `<input type="number" class="input">`
const button = `<button class="button">Press here</button>`

const mainDiv = document.querySelector('.container');
mainDiv.innerHTML += input;
mainDiv.innerHTML += button;
const xhr = new XMLHttpRequest();

function getResponse(url, callback) {
  xhr.open('get', url, true);

  xhr.onload = function () {
    const result = JSON.parse(xhr.response);
    if (callback) {
      callback(result);
    }
  }

  xhr.send();
}

const resultNode = document.querySelector('.result');
const buttonElement = document.querySelector('.button');
const inputElement = document.querySelector('.input');

function showResult(apiData) {
  let cards = '';

  apiData.forEach(item => {
    const finalResult = `
      <div class="result-container">
        <img 
          src='${item.download_url}' width = 500 height = 333
        >
        <p>${item.author}</p>
      </div>
    `
    cards += finalResult
  })

  resultNode.innerHTML += cards;
}

const handleResult = function () {
  let inputValue = document.querySelector('input').value;

  if (resultNode.innerHTML !== '') {
    resultNode.innerHTML = '';
  }

  if (inputValue < 1 || inputValue > 10) {
    resultNode.innerHTML = `
      <p class="errorStyle">Число вне диапазона от 1 до 10</p>
    `;
    inputElement.style.backgroundColor = '#e77c5a';
  } else {
    getResponse(`https://picsum.photos/v2/list?limit=${inputValue}`, showResult);
    inputElement.value = '';
  }
}

function handleResultOnEnter(e) {
  if(e.key === 'Enter') {
    handleResult();
  }
}

buttonElement.onclick = handleResult;
inputElement.onkeydown = handleResultOnEnter;

inputElement.onclick = function () {
  inputElement.style.backgroundColor = 'transparent';
  inputElement.value = '';
  if (resultNode.innerHTML.includes('Число вне диапазона от 1 до 10')) {
    resultNode.innerHTML = '';
  }
}




