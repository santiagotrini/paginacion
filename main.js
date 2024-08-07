
let filterInput = document.querySelector('input');
let btnPrev = document.querySelector('#prev');
let btnNext = document.querySelector('#next');
btnPrev.addEventListener('click', handlePrev);
btnNext.addEventListener('click', handleNext);
filterInput.addEventListener('input', handleInput);
filterInput.value = '';


let currentPage = 1;
let currentName = null;
let lastPage = 42;

function handlePrev() {
  if (currentPage > 1) currentPage--;
  if (currentPage < lastPage) btnNext.disabled = false;
  if (currentPage == 1) btnPrev.disabled = true;
  fetchCharacters(currentPage, currentName);
}

function handleNext() {
  if (currentPage < lastPage) currentPage++;
  if (currentPage > 1) btnPrev.disabled = false;
  if (currentPage == lastPage) btnNext.disabled = true;
  fetchCharacters(currentPage, currentName);
}

function fetchCharacters(page, name) {
  let url = 'https://rickandmortyapi.com/api/character';
  url += `?page=${page ? page : 1}`;
  if (name) url += `&name=${name}`;
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => {
      lastPage = data.info.pages;
      document.querySelector('#page').textContent = `${page}/${lastPage}`;
      let container = document.querySelector('.container');
      container.innerHTML = '';
      for (let character of data.results) {
        let card = document.createElement('div');
        let title = document.createElement('h1');
        let img = document.createElement('img');
        card.classList.add('card');
        title.textContent = character.name;
        img.src = character.image;
        card.append(img);
        card.append(title);
        container.append(card);
      }
    });
}

function handleInput(e) {
  if (e.target.value.length >= 1 && e.target.value.length <= 3) return;
  if (e.target.value == '') {
    currentPage = 1;
    currentName = null;
  } else {
    currentName = e.target.value;
    currentPage = 1;
  }
  fetchCharacters(currentPage, currentName);
}

fetchCharacters(currentPage, currentName);