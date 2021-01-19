


var myMap = L.map("map", {
    center: [0, 0],
    zoom: 2.2
  });

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1Ijoicm9iaW5raGFuMTk4NCIsImEiOiJja2lzMmR0bXcwZXllMnhxamNxcmFneGtsIn0.ycbPjsgHA2IixraQFPlPJA"
}).addTo(myMap);

// Grabbing our GeoJSON data..
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(link).then((data) => {
    console.log(data);
    var geoJsonLayer = L.geoJSON(data)
    geoJsonLayer.addTo(myMap);
});

// d3.json(link, function (json) {
//     var alldata = json.features;
//     console.log(alldata);
// )};





