document.addEventListener('DOMContentLoaded', () => {

  const flipcardContainer = document.getElementById('flipcard-container');
  const links = document.querySelectorAll('.flipcard-link');

  let currentPage = -1;
  let currentData = null;

  function loadFlipcardSet(setName, pageIndex = -1) {
    const flipcardData = ALL_FLIPCARDS[setName];
    if (!flipcardData) return;
    currentData = flipcardData;
    currentData.setFolder = setName;
    currentPage = pageIndex;
    updateSidebarActive(setName);
    renderPage(currentPage);
  }

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const setName = link.dataset.set;
      updateHash(setName, -1);
    });
  });

  function renderPage(pageIndex) {
    if (!currentData) return;
    const folder = currentData.setFolder;
    let html = '';

    updateHash(folder, pageIndex);

    if (pageIndex === -1) {
      html = `
        <div class="flipcard right" id="right-page">
          ${currentData.cover ? `<img src="${BASE_URL}assets/images/${folder}/${currentData.cover}" />` : ''}
          <div class="text"></div>
        </div>
      `;
      flipcardContainer.innerHTML = html;

      document.getElementById('right-page').onclick = () => {
        currentPage = 0;
        renderPage(currentPage);
      };
      return;
    }

    const page = currentData.pages[pageIndex];

    html = `
      <div class="flipcard left" id="left-page">
        ${page.left.image ? `<img src="${BASE_URL}assets/images/${folder}/${page.left.image}" />` : ''}
        <div class="text">${page.left.text || ''}</div>
      </div>
      <div class="flipcard right" id="right-page">
        ${page.right.image ? `<img src="${BASE_URL}assets/images/${folder}/${page.right.image}" />` : ''}
        <div class="text">${page.right.text || ''}</div>
      </div>
    `;
    flipcardContainer.innerHTML = html;

    document.getElementById('left-page').onclick = () => {
      if (currentPage > 0) currentPage--;
      else if (currentPage === 0) currentPage = -1;
      renderPage(currentPage);
    };
    document.getElementById('right-page').onclick = () => {
      if (currentPage < currentData.pages.length - 1) currentPage++;
      renderPage(currentPage);
    };
  }

  function updateHash(setName, pageIndex) {
    const safeSetName = encodeURIComponent(setName);
    if (pageIndex === -1) {
      window.location.hash = safeSetName;
    } else {
      window.location.hash = `${safeSetName}-${pageIndex}`;
    }
  }

  function handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const [setName, pageStr] = hash.split('-');
    const pageIndex = pageStr !== undefined ? parseInt(pageStr, 10) : -1;
    loadFlipcardSet(decodeURIComponent(setName), pageIndex);
  }

  function updateSidebarActive(setName) {
    links.forEach(link => {
      if (link.dataset.set === setName) link.classList.add('active');
      else link.classList.remove('active');
    });
  }


  const sidebar = document.getElementById('sidebar');
  const sidebarList = sidebar.querySelector('ul');

  function updateSidebarArrows() {
    const scrollTop = sidebarList.scrollTop;
    const scrollHeight = sidebarList.scrollHeight;
    const clientHeight = sidebarList.clientHeight;

    sidebar.classList.toggle('scrollable-top', scrollTop > 0);
    sidebar.classList.toggle('scrollable-bottom', scrollTop + clientHeight < scrollHeight);
  }

  updateSidebarArrows();

  sidebarList.addEventListener('scroll', updateSidebarArrows);



  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);

});
