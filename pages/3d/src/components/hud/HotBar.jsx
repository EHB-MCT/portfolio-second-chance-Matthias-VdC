import React from "react";
import crossbowPreview from "../../images/preview/crossbow-preview.webp";
import stonePreview from "../../images/stone.jpg";
import grassPreview from "../../images/grass.jpg";
import "./HotBar.css";

export default function HotBar({ activeTexture }) {
  const previews = {
    crossbow: crossbowPreview,
  };
  return (
    <>
      <div className="hotbar image-container">
        {Object.entries(previews).map(([k, src]) => {
          return (
            <img
              src={src}
              key={k}
              className={`${k === activeTexture} image-preview`}
              alt={k}
            />
          );
        })}
      </div>
    </>
  );
}
