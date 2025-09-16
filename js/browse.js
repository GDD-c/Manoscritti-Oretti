// browse.js

async function loadCatalog() {
  const response = await fetch("catalog.json");
  const data = await response.json();
  return data.items;
}

function renderCatalog(items) {
  const grid = document.getElementById("catalog-grid");
  const resultCount = document.getElementById("resultCount");

  grid.innerHTML = "";

  if (items.length === 0) {
    resultCount.textContent = "Nessun risultato trovato.";
    return;
  }

  resultCount.textContent = `${items.length} risultati trovati`;

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "col-md-4 col-lg-3";

    card.innerHTML = `
      <div class="card h-100">
        <img src="${item.image}" class="card-img-top" alt="${item.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${item.title}</h5>
          <p class="card-text small">${item.descr}</p>
          <a href="${item.link}" class="btn btn-outline-secondary mt-auto">Vai alla scheda</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

function filterAndSort(items) {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const filterValue = document.getElementById("filter").value;
  const sortValue = document.getElementById("sort").value;

  let filtered = items.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchValue);
    const matchFilter = filterValue ? item.type === filterValue : true;
    return matchSearch && matchFilter;
  });

  if (sortValue === "title-asc") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "title-desc") {
    filtered.sort((a, b) => b.title.localeCompare(a.title));
  }

  return filtered;
}

document.addEventListener("DOMContentLoaded", async () => {
  const items = await loadCatalog();

  function update() {
    const results = filterAndSort(items);
    renderCatalog(results);
  }

  document.getElementById("search").addEventListener("input", update);
  document.getElementById("filter").addEventListener("change", update);
  document.getElementById("sort").addEventListener("change", update);

  update(); // render iniziale
});
