// js/map.js
document.addEventListener('DOMContentLoaded', function () {
  // Inizializza la mappa centrata su Bologna
  const map = L.map('map').setView([44.4949, 11.3426], 13);

  // Aggiunge le tile OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  // Carica i luoghi da GeoJSON
  fetch('data/luoghi.geojson')
    .then(res => res.json())
    .then(data => {
      const geojsonLayer = L.geoJSON(data, {
        onEachFeature: (feature, layer) => {
          const props = feature.properties;
          const popupContent = `
            <strong>${props.name}</strong><br>
            ${props.descr}
          `;
          layer.bindPopup(popupContent);
        }
      }).addTo(map);

      // Zoom automatico per vedere tutti i punti
      map.fitBounds(geojsonLayer.getBounds());
    })
    .catch(err => {
      console.error("Errore nel caricamento di luoghi.geojson:", err);
    });
});
