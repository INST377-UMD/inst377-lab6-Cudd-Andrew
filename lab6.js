var map = L.map('map').setView([37.0902, -95.7129], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}
var coordinates = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
];
coordinates.forEach((coord, index) => {
    var marker = L.marker([coord.lat, coord.lon]).addTo(map);
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coord.lat}&longitude=${coord.lon}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            var locality = data.locality || "Unknown Location";
            marker.bindPopup(`<b>Marker ${index + 1}</b><br>Latitude: ${coord.lat}, Longitude: ${coord.lon}<br>Locality: ${locality}`).openPopup();
            document.getElementById('mark').innerHTML += `
                 <p><b>Marker ${index + 1}:</b> Latitude: ${coord.lat}, Longitude: ${coord.lon}<br>
                 Locality: ${locality}</p>
             `;
        })
});