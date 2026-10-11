"use client";

import { useEffect, useId, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GoogleMapsLoader from "./GoogleMapsLoader";

export default function GoogleAutocomplete({
  id,
  value,
  onChange,
  onSelect,
  error,
  helperText,
  label,
  required,
  className,
  autoComplete,
  inputTitle,
  loadMaps = false,
}) {
  const generatedId = useId();
  const inputRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  const [mapsRequested, setMapsRequested] = useState(false);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    let autocomplete;
    let listener;

    const init = () => {
      if (!window.google?.maps?.places?.Autocomplete || !inputRef.current || autocomplete) return;

      autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["address"],
        componentRestrictions: { country: "nz" },
        fields: ["address_components", "formatted_address"],
      });

      listener = autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place?.formatted_address) return;

        const components = place.address_components || [];
        const component = (type, format = "long_name") => components.find((item) => item.types.includes(type))?.[format] || "";

        onSelectRef.current?.({
          formattedAddress: place.formatted_address,
          unformattedAddress: {
            streetNumber: component("street_number"),
            streetName: component("route"),
            suburb: component("sublocality_level_1") || component("sublocality"),
            city: component("locality"),
            region: component("administrative_area_level_1"),
            postalCode: component("postal_code"),
            country: component("country", "short_name"),
          },
        });
      });

      // A visitor may paste an address before the on-demand script finishes.
      // Ask the widget to process that existing text once it is attached.
      if (document.activeElement === inputRef.current && inputRef.current.value) {
        inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    window.addEventListener("gmaps-ready", init);
    init();

    return () => {
      window.removeEventListener("gmaps-ready", init);
      listener?.remove();
      autocomplete?.unbindAll();
    };
  }, []);

  return (
    <>
      {(loadMaps || mapsRequested) && <GoogleMapsLoader />}
      {inputTitle && <Typography variant="h6" component="h2" className="mt-24">{inputTitle}</Typography>}
      <TextField
        id={id || generatedId}
        name={id}
        className={className}
        label={label}
        value={value}
        onFocus={() => setMapsRequested(true)}
        onChange={(event) => {
          setMapsRequested(true);
          onChange(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
          }
        }}
        inputRef={inputRef}
        color="secondary"
        fullWidth
        required={required}
        autoComplete={autoComplete}
        error={!!error}
        helperText={error ? helperText : undefined}
      />
    </>
  );
}
