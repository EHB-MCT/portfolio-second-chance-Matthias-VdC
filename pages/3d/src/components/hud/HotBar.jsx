import React from "react";
import crossbowPreview from "../../images/preview/crossbow-preview.webp";
import ramPreview from "../../images/preview/ram-preview.png";
import stonePreview from "../../images/stone.jpg";
import grassPreview from "../../images/grass.jpg";
import "./HotBar.css";

export default function HotBar({ activeTexture }) {
  const previews = {
    crossbow: crossbowPreview,
    ram: ramPreview,
  };
  return (
    <div className="hotbar">
      {Object.entries(previews).map(([k, src]) => {
        return (
          <div className="image-container" key={k}>
            {k === "crossbow" ? (
              <p
                style={{
                  position: "absolute",
                  color: "white",
                  top: 0,
                  left: 15,
                }}
              >
                75$
              </p>
            ) : null}
            {k === "ram" ? (
              <p
                style={{
                  position: "absolute",
                  color: "white",
                  top: 0,
                  left: 15 + 110,
                }}
              >
                125$
              </p>
            ) : null}
            <img
              src={src}
              className={`${k === activeTexture} image-preview`}
              alt={k}
            />
          </div>
        );
      })}
    </div>
  );
}
