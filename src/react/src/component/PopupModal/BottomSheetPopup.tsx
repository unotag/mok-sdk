import React from "react";
import { BottomSheetPopup } from "../../types";

export default function BottomSheetPopup({
  popupData,
  handleOverlayClick,
  handleCloseBtn,
  latestPopupData,
}: BottomSheetPopup) {
  return (
    <>
      {latestPopupData?.html ? (
        <div>
          <div
            onClick={event =>
              handleOverlayClick(event, latestPopupData?.payload?.in_app_id)
            }
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              zIndex: "9999",
            }}
          >
            <div
              style={{
                position: "fixed",
                bottom: "0",
                width: "86%",
                backgroundColor: "#fff",
                boxShadow: "0px -5px 15px 0px rgba(0, 0, 0, 0.1)",
                transition: "bottom 0.3s ease-out",
                padding: "20px",
                height: "50vh",
                maxWidth: "1150px",
                overflowY: "auto",
                borderRadius: "20px 20px 0px 10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: latestPopupData?.html,
                }}
              ></div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
