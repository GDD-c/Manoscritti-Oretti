fetch('data/catalog.json')
  .then(response => response.json())
  .then(items => {
    const container = document.getElementById('catalogo');

    items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${item.immagine}" alt="${item.titolo}">
        <h3>${item.titolo}</h3>
        <p>${item.descrizione}</p>
        <p><a href="${item.link}">Scopri di più</a></p>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => console.error('Errore nel caricamento del catalogo:', error));
