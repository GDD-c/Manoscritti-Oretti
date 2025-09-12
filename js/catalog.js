// js/catalog.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("catalog-grid");
  const search = document.getElementById("search");
  const filter = document.getElementById("filter");
  const sort = document.getElementById("sort");
  const resultCount = document.getElementById("resultCount");
  const btnGrid = document.getElementById("btnGrid");
  const btnList = document.getElementById("btnList");
  const DEFAULT_IMG = "images/default.jpg";

  let items = [];
  let view = "grid";

  async function loadCatalog() {
    const res = await fetch("data/catalog.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Errore nel caricamento di catalog.json");
    return await res.json();
  }

  function normalize(str) {
    return (str || "").toString().toLowerCase();
  }

  function render(list) {
    grid.innerHTML = "";

    if (!list || list.length === 0) {
      resultCount.textContent = "Nessun risultato";
      return;
    }

    resultCount.textContent = `${list.length} risultato${list.length === 1 ? "" : "i"}`;

    const isGrid = view === "grid";
    list.forEach(item => {
      const col = document.createElement("div");
      col.className = isGrid ? "col-12 col-sm-6 col-md-4 col-lg-3" : "col-12";

      const img = item.immagine || DEFAULT_IMG;
      const descr = item.descrizione ? `<p class="card-text small">${item.descrizione}</p>` : "";

      col.innerHTML = isGrid
        ? `
        <div class="card h-100 shadow-sm">
          <img src="${img}" class="card-img-top" alt="${item.titolo}" style="height:200px;object-fit:cover" onerror="this.src='${DEFAULT_IMG}'">
          <div class="card-body">
            <div class="small text-uppercase text-muted mb-1">${item.tipo || ""}</div>
            <h5 class="card-title">${item.titolo}</h5>
            ${descr}
            <a href="${item.link}" class="btn btn-sm btn-outline-primary">Apri scheda</a>
          </div>
        </div>`
        : `
        <div class="d-flex gap-3 align-items-start border rounded p-3 h-100">
          <img src="${img}" alt="${item.titolo}" style="width:96px;height:96px;object-fit:cover;border-radius:6px" onerror="this.src='${DEFAULT_IMG}'">
          <div>
            <div class="small text-uppercase text-muted">${item.tipo || ""}</div>
            <h5 class="mb-1"><a href="${item.link}">${item.titolo}</a></h5>
            ${item.descrizione ? `<p class="mb-0 text-muted small">${item.descrizione}</p>` : ""}
          </div>
        </div>`;
      grid.appendChild(col);
    });
  }

  function applyFilters() {
    let list = [...items];

    // ricerca
    const q = normalize(search?.value);
    if (q) list = list.filter(i => normalize(i.titolo).includes(q));

    // filtro per tipologia
    const t = filter?.value;
    if (t) list = list.filter(i => normalize(i.tipo) === normalize(t));

    // ordinamento
    if (sort?.value === "title-asc") {
      list.sort((a, b) => a.titolo.localeCompare(b.titolo));
    } else if (sort?.value === "title-desc") {
      list.sort((a, b) => b.titolo.localeCompare(a.titolo));
    }

    render(list);
  }

  // toggle griglia/lista
  btnGrid?.addEventListener("click", () => {
    view = "grid";
    btnGrid.classList.add("active");
    btnList.classList.remove("active");
    applyFilters();
  });

  btnList?.addEventListener("click", () => {
    view = "list";
    btnList.classList.add("active");
    btnGrid.classList.remove("active");
    applyFilters();
  });

  // eventi ricerca/filtro/ordinamento
  search?.addEventListener("input", applyFilters);
  filter?.addEventListener("change", applyFilters);
  sort?.addEventListener("change", applyFilters);

  // avvio
  loadCatalog()
    .then(json => {
      items = json;
      applyFilters();
    })
    .catch(err => {
      console.error(err);
      grid.innerHTML = `<p class="text-danger">Errore nel caricamento del catalogo.</p>`;
      resultCount.textContent = "Errore di caricamento";
    });
});
