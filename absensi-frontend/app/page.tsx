"use client";

import { useState, useRef } from "react";
import Webcam from "react-webcam";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

// Import komponen react-leaflet secara dinamis
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

export default function Home() {
  const webcamRef = useRef<Webcam>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [name, setName] = useState("");

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setPosition([pos.coords.latitude, pos.coords.longitude]);
    });
  };

  const handleSubmit = async () => {
    if (!webcamRef.current || !position) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    const res = await fetch(imageSrc);
    const blob = await res.blob();
    const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", file);
    formData.append("latitude", position[0].toString());
    formData.append("longitude", position[1].toString());

    await fetch("https://8847603ffd2b.ngrok-free.app/attendance", {
      method: "POST",
      body: formData,
    });

    alert("Absensi berhasil!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📋 Absensi Karyawan
        </h1>

        {/* Input Nama */}
        <input
          className="border border-gray-300 p-3 rounded-lg mb-4 w-full focus:ring-2 focus:ring-blue-400 outline-none text-black"
          placeholder="Masukkan Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Webcam */}
        <div className="mb-4 overflow-hidden rounded-xl border border-gray-300">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full"
          />
        </div>

        {/* Tombol Ambil Lokasi */}
        <button
          onClick={getLocation}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-lg mb-4 transition-all duration-200"
        >
          📍 Ambil Lokasi
        </button>

        {/* Map */}
        {position && (
          <div className="rounded-xl overflow-hidden border border-gray-300 mb-4">
            <MapContainer
              center={position as LatLngExpression}
              zoom={16}
              style={{ height: "250px", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position as LatLngExpression} />
            </MapContainer>
          </div>
        )}

        {/* Tombol Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200"
        >
          ✅ Submit Absensi
        </button>
      </div>
    </div>
  );
}
