document.addEventListener('DOMContentLoaded', () => {
  const flipcardContainer = document.getElementById('flipcard-container');
  const links = document.querySelectorAll('.flipcard-link');

  let currentPage = -1;
  let currentData = null;
  let autoScrollInterval = null;
  let isAutoScrolling = false;

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
        <div class="text"><span>${page.left.text || ''}</span></div>
        <div class="page-number">${2 * pageIndex + 1}</div>
      </div>
      <div class="flipcard right" id="right-page">
        ${page.right.image ? `<img src="${BASE_URL}assets/images/${folder}/${page.right.image}" />` : ''}
        <div class="text"><span>${page.right.text || ''}</span></div>
        <div class="page-number">${2 * pageIndex + 2}</div>
      </div>
    `;
    flipcardContainer.innerHTML = html;

    document.getElementById('left-page').onclick = () => {
      if (currentPage > 0) currentPage--;
      else if (currentPage === 0) currentPage = -1;
      stopAutoScroll();
      renderPage(currentPage);
    };
    document.getElementById('right-page').onclick = () => {
      if (currentPage < currentData.pages.length - 1) currentPage++;
      stopAutoScroll();
      renderPage(currentPage);
    };

    document.querySelectorAll('.flipcard .text').forEach(fitTextToContainer);
  }

  function fitTextToContainer(container) {
    const span = container.querySelector('span');
    if (!span) return;

    span.style.fontSize = '';
    span.style.whiteSpace = 'normal';

    let fontSize = parseFloat(window.getComputedStyle(span).fontSize);
    const maxHeight = container.clientHeight * 0.9;

    while (span.scrollHeight > maxHeight && fontSize > 10) {
      fontSize -= 1;
      span.style.fontSize = `${fontSize}px`;
    }
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
  sidebarList?.addEventListener('scroll', updateSidebarArrows);
  updateSidebarArrows();

  handleHashChange();
  window.addEventListener('hashchange', handleHashChange);

  const firstBtn = document.getElementById('first-page-btn');
  const prevBtn = document.getElementById('prev-page-btn');
  const nextBtn = document.getElementById('next-page-btn');
  const lastBtn = document.getElementById('last-page-btn');
  const autoBtn = document.getElementById('auto-scroll-btn');

  firstBtn.addEventListener('click', () => {
    if (!currentData) return;
    stopAutoScroll();
    currentPage = 0;
    renderPage(currentPage);
  });

  prevBtn.addEventListener('click', () => {
    if (!currentData) return;
    stopAutoScroll();
    if (currentPage > 0) currentPage--;
    else if (currentPage === 0) currentPage = -1;
    renderPage(currentPage);
  });

  nextBtn.addEventListener('click', () => {
    if (!currentData) return;
    stopAutoScroll();
    if (currentPage < currentData.pages.length - 1) currentPage++;
    renderPage(currentPage);
  });

  lastBtn.addEventListener('click', () => {
    if (!currentData) return;
    stopAutoScroll();
    currentPage = currentData.pages.length - 1;
    renderPage(currentPage);
  });

  autoBtn.addEventListener('click', () => {
    if (isAutoScrolling) stopAutoScroll();
    else startAutoScroll();
  });

  function startAutoScroll() {
    if (!currentData || isAutoScrolling) return;
    isAutoScrolling = true;

    // Set pause SVG
    autoBtn.innerHTML = `
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path fill="currentColor" d="M6 4h4v16H6zM14 4h4v16h-4z"/>
    </svg>
  `;

    autoScrollInterval = setInterval(() => {
      if (currentPage < currentData.pages.length - 1) {
        currentPage++;
        renderPage(currentPage);
      } else {
        stopAutoScroll();
      }
    }, 5000); // INTERVAL
  }

  function stopAutoScroll() {
    if (!isAutoScrolling) return;
    clearInterval(autoScrollInterval);
    isAutoScrolling = false;

    // Set play SVG
    autoBtn.innerHTML = `
    <svg viewBox="0 0 24 24" width="100%" height="100%">
      <path fill="currentColor" d="M8 5v14l11-7z"/>
    </svg>
  `;
  }

});
