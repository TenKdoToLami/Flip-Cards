const flipcardContainer = document.getElementById('flipcard-container');
const links = document.querySelectorAll('.flipcard-link');

let currentPage = 0;
let currentData = null;

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const setName = link.dataset.set;

    // Use the pre-rendered global variable
    const flipcardData = ALL_FLIPCARDS[setName];
    if (!flipcardData) return;

    renderFlipcards(flipcardData);
  });
});

function renderFlipcards(data) {
  currentData = data;
  currentPage = 0;
  renderPage(currentPage);
}

function renderPage(pageIndex) {
  const page = currentData.pages[pageIndex];

  flipcardContainer.innerHTML = `
    <div class="flipcard left" id="left-page">
      ${page.left.image ? `<img src="${page.left.image}" />` : ''}
      <div class="text">${page.left.text || ''}</div>
    </div>
    <div class="flipcard right" id="right-page">
      ${page.right.image ? `<img src="${page.right.image}" />` : ''}
      <div class="text">${page.right.text || ''}</div>
    </div>
  `;

  document.getElementById('left-page').onclick = () => {
    if (currentPage > 0) currentPage--;
    renderPage(currentPage);
  };
  document.getElementById('right-page').onclick = () => {
    if (currentPage < currentData.pages.length - 1) currentPage++;
    renderPage(currentPage);
  };
}


