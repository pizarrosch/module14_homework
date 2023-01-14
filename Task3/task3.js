const input = `<input type="number" class="input">`
const button = `<button class="button">Press here</button>`

const mainDiv = document.querySelector('.container');
mainDiv.innerHTML += input;
mainDiv.innerHTML += button;
const xhr = new XMLHttpRequest();

function getResponse(url, callback) {
  xhr.open('get', url, true);

  xhr.onload = function() {
    const result = JSON.parse(xhr.response);
    if(callback) {
      callback (result);
    }
  }

  xhr.send();
}

const resultNode = document.querySelector('.result');
const buttonElement= document.querySelector('.button');
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

buttonElement.onclick = function () {
  const inputValue = document.querySelector('input').value;

  if (inputValue < 1 || inputValue > 10) {
    resultNode.innerHTML = `<p style="color: red; font-size: 16px; margin-top: -30px">Число вне диапазона от 1 до 10</p>`;
    inputElement.style.backgroundColor = '#e77c5a';
  } else {
    getResponse(`https://picsum.photos/v2/list?limit=${inputValue}`, showResult)
  }
}
