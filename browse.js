document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("browse-container");

  fetch("data/catalog.json")
    .then(res => {
      if (!res.ok) throw new Error("catalog.json non trovato");
      return res.json();
    })
    .then(data => {
      const grouped = {};
      data.forEach(item => {
        grouped[item.tipo] ??= [];
        grouped[item.tipo].push(item);
      });

      const ordine = ["manoscritto", "autori", "collezionisti", "opere", "luogo"];

      ordine.forEach(tipo => {
        if (grouped[tipo]) {
          // Sezione di categoria
          const header = document.createElement("div");
          header.className = "col-12";
          header.innerHTML = `<h2 class="h5 mb-3 mt-4 text-capitalize">${tipo}s</h2>`;
          container.appendChild(header);

          grouped[tipo].forEach(item => {
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4";

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

            container.appendChild(col);
          });
        }
      });
    })
    .catch(error => {
      container.innerHTML = `<p class="text-danger">Errore: ${error.message}</p>`;
      console.error(error);
    });
});
