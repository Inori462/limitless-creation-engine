import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import type { Farm } from "@/lib/types";

export default function FarmMapInner({ farms }: { farms: Pick<Farm, "id" | "name" | "lat" | "lng" | "crop" | "location">[] }) {
  const bounds = farms.length > 1 ? L.latLngBounds(farms.map((f) => [f.lat, f.lng])).pad(0.3) : undefined;
  const center: [number, number] = farms[0] ? [farms[0].lat, farms[0].lng] : [21, 78];
  return (
    <MapContainer center={center} zoom={farms.length === 1 ? 10 : 5} bounds={bounds} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {farms.map((f) => (
        <CircleMarker key={f.id} center={[f.lat, f.lng]} radius={10} pathOptions={{ color: "#174D35", fillColor: "#D6AD52", fillOpacity: 0.9, weight: 2 }}>
          <Popup><strong>{f.name}</strong><br />{f.crop} · {f.location}</Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
