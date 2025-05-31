<template>
  <div class="map-view">
    <h2>Charger Map</h2>
    <div id="map" style="height: 500px;"></div>
  </div>
</template>

<script>
import L from "leaflet";
import { onMounted } from "vue";
import api from "../api";

export default {
  setup() {
    const initMap = async () => {
      const map = L.map("map").setView([20.5937, 78.9629], 5); // Center: India

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      try {
        const res = await api.get("/chargers");
        res.data.forEach((charger) => {
          const marker = L.marker([charger.latitude, charger.longitude]).addTo(map);
          marker.bindPopup(
            `<strong>${charger.name}</strong><br>
             Status: ${charger.status}<br>
             Power: ${charger.power_output}kW<br>
             Connector: ${charger.connector_type}`
          );
        });
      } catch (err) {
        console.error("Failed to load chargers", err);
      }
    };

    onMounted(initMap);
  },
};
</script>
