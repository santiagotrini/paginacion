let page = 1;
let url = 'https://rickandmortyapi.com/api/character?page='

function handlePrev(e) {
  if (page > 1)  page--;
  if (page == 1) e.currentTarget.disabled = true;
  if (page < 42) e.currentTarget.nextElementSibling.disabled = false;
  updateList();
}

function handleNext(e) {
  if (page < 42)  page++;
  if (page == 42) e.currentTarget.disabled = true;
  if (page > 1)   e.currentTarget.previousElementSibling.disabled = false;
  updateList();
}

function updateList() {
  fetch(url + page)
  .then(res => res.json())
  .then(data => {
    let container = document.querySelector('.container');
    container.innerHTML = '';
    for (let c of data.results) {
      let div = document.createElement('div');
      let img = document.createElement('img');
      let h3  = document.createElement('h2');
      div.classList.add('card');
      img.src = c.image;
      h3.textContent = c.name;
      div.append(img);
      div.append(h3);
      container.append(div);
    }
    document.querySelector('#page').textContent = `${page}/42`;
  });
}


document.querySelector('#prev').addEventListener('click', handlePrev);
document.querySelector('#next').addEventListener('click', handleNext);


updateList();
