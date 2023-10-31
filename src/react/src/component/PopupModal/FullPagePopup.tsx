import React from "react";
import { FullPagePopup } from "../../types";

export default function FullPagePopup({
  popupData,
  handleClearAll,
  handleCloseBtn,
  latestPopupData
}: FullPagePopup) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          flexDirection: "column",
          zIndex: "9999",
        }}
      >
        <button
          onClick={handleCloseBtn}
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            border: "none",
            cursor: "pointer",
            height: "32px",
            width: "32px",
            borderRadius: "50%",
            boxShadow: "rgba(0,0,0,0.2) 0px 0px 10px",
            fontSize: "26px",
            position: "absolute",
            top: "6px",
            right: "6px",
            zIndex: "9999"
          }}
        >
          &times;
        </button>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgb(255, 255, 255)",
            textAlign: "center",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            position: "fixed",
            overflow: "auto",
          }}
        >
          <iframe
            src={latestPopupData?.popup_configs?.web_url}
            style={{ borderWidth: "0px" }}
            width="100%"
            height="100%"
          ></iframe>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>
      </div>
    </>
  );
}
