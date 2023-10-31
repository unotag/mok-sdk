import React from "react";
import { NormalPopup } from "../../types";

export default function NormalPopup({
  popupData,
  handleClearAll,
  handleOverlayClick,
  latestPopupData,
  handleCloseBtn,
}: NormalPopup) {
  return (
    <div>
      {latestPopupData?.html ? (
        <div
          onClick={(event)=>handleOverlayClick(event,latestPopupData?.payload?.in_app_id)}
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
          {popupData
            .slice(0)
            .reverse()
            .map((item, index) => {
              if (index < 3) {
                return (
                  <div
                    style={{
                      top: `${46 + index * 1.5}%`,
                      width: "75%",
                      maxWidth: "420px",
                      maxHeight: "70%",
                      height: "auto",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "10px",
                      padding: "20px",
                      textAlign: "center",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                      transform: `translate(-50%, -50%) scale(${
                        1 - index * 0.02
                      })`,
                      position: "fixed",
                      left: "50%",
                      overflow: "auto",
                      zIndex: 99000 - index,
                      transition: "2s",
                    }}
                  >
                    <button
                      onClick={()=>handleCloseBtn(latestPopupData?.payload?.in_app_id)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "28px",
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                      }}
                    >
                      &times;
                    </button>
                    {popupData.length > 0 &&
                    popupData[popupData.length - 1]?.html ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: popupData[popupData.length - 1].html,
                        }}
                      ></div>
                    ) : null}
                  </div>
                );
              }
            })}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {popupData.length > 1 ? (
              <div
                style={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                {popupData.length - 1} more messages
              </div>
            ) : null}

            <div
              onClick={handleClearAll}
              style={{
                color: "black",
                fontSize: "17px",
                fontWeight: "300",
                marginTop: "10px",
                border: "1px solid black",
                padding: "1px 10px",
                borderRadius: "20px",
                background: "rgba(0,0,0,0.2)",
                width: "fit-content",
              }}
            >
              &times; clear all
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={(event)=>handleOverlayClick(event,latestPopupData?.payload?.in_app_id)}
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
            zIndex: "9999",
            flexDirection: "column",
          }}
        >
          {popupData
            .slice(0)
            .reverse()
            .map((item, index) => {
              if (index < 3) {
                return (
                  <div
                    style={{
                      top: `${46 + index * 1.5}%`,
                      width: "75%",
                      maxWidth: "420px",
                      maxHeight: "70%",
                      height: "auto",
                      background: "rgb(255, 255, 255)",
                      borderRadius: "10px",
                      padding: "20px",
                      textAlign: "center",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                      transform: `translate(-50%, -50%) scale(${
                        1 - index * 0.02
                      })`,
                      position: "fixed",
                      left: "50%",
                      overflow: "auto",
                      zIndex: 99000 - index,
                      transition: "2s",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px gray black",
                        paddingBottom: "10px",
                      }}
                    >
                      <h1
                        style={{
                          color: "#000000",
                          fontSize: "24px",
                          margin: "0",
                          textAlign: "start",
                        }}
                      >
                        {latestPopupData && latestPopupData?.payload?.title}
                      </h1>
                      <button
                        onClick={()=>handleCloseBtn(latestPopupData?.payload?.in_app_id)}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "24px",
                        }}
                      >
                        &times;
                      </button>
                    </div>
                    <img
                      style={{ width: "100%" }}
                      src={
                        latestPopupData && latestPopupData?.payload?.image
                      }
                    />
                    <p
                      style={{
                        color: "#000000",
                        fontSize: "18px",
                        textAlign: "start",
                      }}
                    >
                      {latestPopupData && latestPopupData?.payload?.text}
                    </p>
                  </div>
                );
              }
            })}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {popupData.length > 1 ? (
              <div
                style={{
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                {popupData.length - 1} more messages
              </div>
            ) : null}

            <div
              onClick={handleClearAll}
              style={{
                color: "black",
                fontSize: "17px",
                fontWeight: "300",
                marginTop: "10px",
                border: "1px solid black",
                padding: "1px 10px",
                borderRadius: "20px",
                background: "rgba(0,0,0,0.2)",
                width: "fit-content",
              }}
            >
              &times; clear all
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
