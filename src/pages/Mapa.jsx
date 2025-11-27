import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

export default function Mapa() {
  const polos = [
    { id: 1, nombre: "Polo A", lat: 19.54, lon: -96.92 }
  ];

  return (
    <MapContainer
      center={[19.54, -96.92]}
      zoom={6}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {polos.map(p => (
        <Marker key={p.id} position={[p.lat, p.lon]}>
          <Popup>
            <b>{p.nombre}</b>
            <br />
            <a href="/paseo">Ir al recorrido 3D</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
