document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("catalog-grid");
  const search = document.getElementById("search");
  const filter = document.getElementById("filter");
  const sort = document.getElementById("sort");
  const resultCount = document.getElementById("resultCount");
  const btnGrid = document.getElementById("btnGrid");
  const btnList = document.getElementById("btnList");

  let items = [];

  fetch("data/catalog.json")
    .then(res => {
      if (!res.ok) throw new Error("catalog.json non trovato");
      return res.json();
    })
    .then(data => {
      items = data;
      render(items);
    })
    .catch(err => {
      grid.innerHTML = `<p class="text-danger">Errore: ${err.message}</p>`;
      console.error(err);
    });

  function render(list) {
    grid.innerHTML = "";
    list.forEach(item => {
      const col = document.createElement("div");
      col.className = grid.dataset.view === "grid" ? "col-md-4" : "col-12";

      const imgSrc = item.immagine || "img/default.jpg";

      col.innerHTML = `
        <div class="card h-100 shadow-sm">
          <img src="${imgSrc}" class="card-img-top" alt="${item.titolo}" style="height:200px; object-fit:cover;">
          <div class="card-body">
            <h5 class="card-title">${item.titolo}</h5>
            <p class="card-text small">${item.descrizione}</p>
            <a href="${item.link}" class="btn btn-sm btn-outline-primary">Apri scheda</a>
          </div>
        </div>
      `;
      grid.appendChild(col);
    });
    resultCount.textContent = `${list.length} risultato${list.length !== 1 ? 'i' : ''}`;
  }

  function update() {
    let filtered = items;

    const q = search.value.trim().toLowerCase();
    if (q) filtered = filtered.filter(i => i.titolo.toLowerCase().includes(q));

    if (filter.value) filtered = filtered.filter(i => i.tipo === filter.value);

    if (sort.value === "title-desc") {
      filtered.sort((a, b) => b.titolo.localeCompare(a.titolo));
    } else {
      filtered.sort((a, b) => a.titolo.localeCompare(b.titolo));
    }

    render(filtered);
  }

  [search, filter, sort].forEach(el => el.addEventListener("input", update));

  btnGrid.addEventListener("click", () => {
    grid.dataset.view = "grid";
    btnGrid.classList.add("active");
    btnList.classList.remove("active");
    render(items);
  });

  btnList.addEventListener("click", () => {
    grid.dataset.view = "list";
    btnList.classList.add("active");
    btnGrid.classList.remove("active");
    render(items);
  });
});
