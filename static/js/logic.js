// USA coordinates need to be corrected, currently raleigh.
const usa = [35.7596, -79.0193];

var myMap = L.map("map", {
    center:usa,
    zoom: 13,

});

var url = "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}";
var attribution = "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>";

var tileLayer = L.tileLayer(url, {
    attribution: attribution, 
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY,
});

tileLayer.addTo(myMap);








