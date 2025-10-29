document.addEventListener('DOMContentLoaded', () => {
  const flipcardContainer = document.getElementById('flipcard-container');
  const links = document.querySelectorAll('.flipcard-link');

  let currentIndex = 0;
  let currentData = null;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const setName = link.dataset.set;
      const flipcardData = ALL_FLIPCARDS[setName];
      if (!flipcardData) return;

      currentData = flipcardData;
      currentData.setFolder = setName;
      currentIndex = 0;
      renderPage();
    });
  });

  function renderPage() {
    let html = '';
    const folder = currentData.setFolder;

    if (currentIndex === 0) {
      html = `
        <div class="flipcard right" id="right-page">
          ${currentData.cover ? `<img src="${BASE_URL}assets/images/${folder}/${currentData.cover}" />` : ''}
          <div class="text"></div>
        </div>
      `;
    } else {
      const page = currentData.pages[currentIndex - 1]; // pages array starts at 0
      html = `
        <div class="flipcard left" id="left-page">
          ${page.left && page.left.image ? `<img src="${BASE_URL}assets/images/${folder}/${page.left.image}" />` : ''}
          <div class="text">${(page.left && page.left.text) || ''}</div>
        </div>
        <div class="flipcard right" id="right-page">
          ${page.right && page.right.image ? `<img src="${BASE_URL}assets/images/${folder}/${page.right.image}" />` : ''}
          <div class="text">${(page.right && page.right.text) || ''}</div>
        </div>
      `;
    }

    flipcardContainer.innerHTML = html;

    if (currentIndex > 0 && document.getElementById('left-page')) {
      document.getElementById('left-page').onclick = () => {
        currentIndex--;
        renderPage();
      };
    }

    if (document.getElementById('right-page')) {
      document.getElementById('right-page').onclick = () => {
        if (currentIndex < currentData.pages.length) currentIndex++;
        renderPage();
      };
    }
  }
});
