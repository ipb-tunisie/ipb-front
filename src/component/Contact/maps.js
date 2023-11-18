import React, { Component } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

class LeafletMap extends Component {
  componentDidMount() {
   
    const initialViewCoords = [35.8293, 10.64063];
    const markerCoords = [35.831200784544414, 10.627561199758095];
    const markerCoords2 = [36.803723743751405, 10.15586300676481];
    var SousseIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",

      iconSize: [18, 18],

      iconAnchor: [11, 24],

      popupAnchor: [-3, -76],
    });
    var TunisIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/128/2776/2776067.png",

      iconSize: [18, 18],

      iconAnchor: [11, 24],

      popupAnchor: [-3, -76],
    });
    if (this.map) {
      this.map.remove();
    }
    // Create a Leaflet map instance and set its initial view
    this.map = L.map("map").setView(initialViewCoords, 7);

    // Add a tile layer (OpenStreetMap) to the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.marker(markerCoords, { icon: SousseIcon })
      .addTo(this.map)

      .openPopup();
    L.marker(markerCoords2, { icon: TunisIcon })
      .addTo(this.map)

      .openPopup();
  }

  render() {
    return <div id="map" style={{ height: "400px" }} />;
  }
}

export default LeafletMap;
