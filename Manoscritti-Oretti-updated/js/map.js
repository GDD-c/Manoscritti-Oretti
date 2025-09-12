document.addEventListener('DOMContentLoaded', function () {
  const map = L.map('map').setView([44.4949, 11.3426], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18,
  }).addTo(map);

  const luoghi = [
    {
      nome: "Palazzo Pepoli",
      descrizione: "Collezione Pepoli menzionata nel manoscritto B104.",
      coords: [44.4956, 11.3432]
    },
    {
      nome: "Biblioteca Archiginnasio",
      descrizione: "Luogo di conservazione dei manoscritti di Oretti.",
      coords: [44.4928, 11.3437]
    }
  ];

  luoghi.forEach(luogo => {
    L.marker(luogo.coords)
      .addTo(map)
      .bindPopup(`<strong>${luogo.nome}</strong><br>${luogo.descrizione}`);
  });
});
