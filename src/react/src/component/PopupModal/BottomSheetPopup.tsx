import React from "react";
import { BottomSheetPopup } from "../../types";

export default function BottomSheetPopup({
  popupData,
  handleOverlayClick,
  handleCloseBtn,
}: BottomSheetPopup) {
  return (
    <>
      {popupData[popupData.length - 1]?.html ? (
        <div>
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "-1",
              width: "100%",
              height: "100%",
              opacity: "0.2",
              background: "#000",
            }}
          ></div>
          <div
            style={{
              width: "auto",
              position: "relative",
              background: "#fff",
              maxHeight: "100vh",
              height: `50vh`,
              maxWidth: "1150px",
              padding: "25px 30px",
              overflowY: "auto",
              transform: "translateY(100%)",
              borderRadius: "12px 12px 0 0",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.03)",
              transition: "0.3s ease",
            }}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: popupData[popupData.length - 1].html,
              }}
            ></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
