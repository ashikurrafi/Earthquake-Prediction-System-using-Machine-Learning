import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const Map = ({ prediction }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);
    }

    // Update marker if prediction exists
    if (prediction) {
      const { latitude, longitude } = prediction;
      const magnitude = prediction.prediction.magnitude;

      // Remove existing marker if present
      if (markerRef.current) {
        markerRef.current.remove();
      }

      // Create new marker
      markerRef.current = L.circle([latitude, longitude], {
        color: getMagnitudeColor(magnitude),
        fillColor: getMagnitudeColor(magnitude),
        fillOpacity: 0.5,
        radius: Math.pow(10, magnitude) * 100, // Scale circle size by magnitude
      }).addTo(mapInstanceRef.current);

      // Add popup with information
      markerRef.current.bindPopup(`
        <strong>Location:</strong> ${latitude}, ${longitude}<br>
        <strong>Predicted Magnitude:</strong> ${magnitude}<br>
        <strong>Predicted Depth:</strong> ${prediction.prediction.depth} km
      `);

      // Center map on the marker
      mapInstanceRef.current.setView([latitude, longitude], 5);
    }
  }, [prediction]);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>Earthquake Location Map</h3>
        </div>
        <div className="card-body p-0">
          <div
            ref={mapRef}
            style={{ height: "400px", width: "100%" }}
            className="map-container"
          >
            {!prediction && (
              <div className="map-placeholder">
                <p>Enter coordinates to see prediction on map</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to determine color based on magnitude
function getMagnitudeColor(magnitude) {
  if (magnitude < 4) return '#28a745'; // green
  if (magnitude < 6) return '#ffc107'; // yellow
  return '#dc3545'; // red
}

export default Map;
