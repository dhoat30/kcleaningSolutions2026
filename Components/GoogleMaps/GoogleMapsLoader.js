"use client";

import Script from "next/script";
import { useCallback, useEffect } from "react";

export default function GoogleMapsLoader({ onLoad }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const notifyReady = useCallback(() => {
    window.dispatchEvent(new Event("gmaps-ready"));
    onLoad?.();
  }, [onLoad]);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      notifyReady();
    }
  }, [notifyReady]);

  if (!apiKey) return null;

  return (
    <Script
      id="google-maps-places"
      src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
      strategy="afterInteractive"
      onReady={notifyReady}
    />
  );
}
