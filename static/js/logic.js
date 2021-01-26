
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

    function fillCircleColor(mag) {
      switch (true) {
      case mag > 5: 
        return "#0c2c84";
      case mag > 4: 
        return "#1d91c0";
      case mag > 3: 
        return "#41b6c4";
      case mag > 2:
        return "#7fcdbb";
      case mag > 1: 
        return "#c7e9b4";
      case mag > 0: 
        return "#F4A460";        
    };
  }

    var geoJsonLayer =   L.geoJson(data, {
      // Changing to circles 
      pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {
          radius: (feature.properties.mag)*5,
          color: fillCircleColor(feature.properties.mag),
          fillOpacity:1
        });
      },
      // Called on each feature
      onEachFeature: function(feature, layer) {

        layer.bindPopup("<h1>" + feature.geometry.coordinates + "</h1> <hr> <h2>" + feature.properties.mag + "</h2>");
  
      }
    }).addTo(myMap);

    // add legend to map
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
        magnitude = [0, 1, 2, 3, 4, 5],
        labels = ["<b>Magnitude</b>"];
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < magnitude.length; i++) {
        div.innerHTML +=
          labels.push('<i style="background:'
          + fillCircleColor(magnitude[i] + 1) 
          + '">' 
          + magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] : '+'))
          +'</i> '
          + '<br>';
      }
      div.innerHTML = labels.join("<br>");
      return div;
    };
// add legend to map 
    legend.addTo(myMap);

});





