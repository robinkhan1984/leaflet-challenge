
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
  accessToken: API_KEY
}).addTo(myMap);

// Grabbing our GeoJSON data..
// var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
var link = "/static/data/all_week.geojson"


d3.json(link, function (json) {
    var data = json.features;
    console.log(data);
    var geoJsonLayer =   L.geoJson(data, {
      // Changing to circles 
      pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {
          radius: (feature.properties.mag)*5,
          color: 'blue'
        });
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {

        layer.bindPopup("<h1>" + feature.geometry.coordinates + "</h1> <hr> <h2>" + feature.properties.mag + "</h2>");
  
      }
    }).addTo(myMap);

});













var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5, 6, 7],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < mag.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(mag[i] + 1) + '"></i> ' +
            mag[i] + (mag[i + 1] ? '&ndash;' + mag[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);





