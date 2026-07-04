import React from "react";

// small pill label rendered inside a compare-slider pane;
// it clips with the pane as the handle is dragged
export default function CompareLabel({ position = "left", children }) {
  return (
    <span
      style={{
        position: "absolute",
        top: 10,
        [position]: 10,
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: "0.7rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background: "rgba(17, 17, 27, 0.55)",
        color: "#fff",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {children}
    </span>
  );
}
