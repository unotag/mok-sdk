import { useEffect, useRef, useState } from "react";
import { PopupProps } from "../types";

export const MokPopup = ({ readKey, id, isDev, isLocal }: PopupProps) => {
  const [clickedPopup, setClickedPopup] = useState<boolean[]>([]);
  const [popupData, setPopupData] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // const toggle = () => setClickedPopup(p => !p);

  const BASE_URL = isDev
    ? "https://dev.mok.one"
    : isLocal
    ? "http://localhost:8080"
    : "https://live.mok.one";

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      setClickedPopup(popups => popups.slice(0, -1));
      setPopupData(data => data.slice(0, -1));
    }
  };

  const handleClearAll = () => {
    setClickedPopup([]);
    setPopupData([]);
  };

  useEffect(() => {
    const es = new EventSource(`${BASE_URL}/server/sse`);

    const eventListener = (event: MessageEvent) => {
      setClickedPopup(popups => [...popups, true]);
      setPopupData(data => [...data, JSON.parse(event.data)]);
    };

    es.addEventListener(`event_${readKey}_${id}`, eventListener);

    return () => {
      es.removeEventListener(`event_${readKey}_${id}`, eventListener);
      es.close();
    };
  }, []);

  useEffect(() => {
    if (containerRef.current && popupData.length > 0) {
      containerRef.current.innerHTML = popupData[popupData.length - 1]?.html;
    }
  }, [popupData]);

  const latestpopupData = popupData[popupData.length - 1];

  return (
    <>
      {clickedPopup.length > 0 && clickedPopup[clickedPopup.length - 1] && (
        <>
          {latestpopupData?.html ? (
            <div
              onClick={handleOverlayClick}
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
                  width: "75%",
                  maxWidth: "420px",
                  maxHeight: "80%",
                  height: "auto",
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  overflow: "scroll",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => {
                    setClickedPopup(popups => popups.slice(0, -1));
                    setPopupData(data => data.slice(0, -1));
                  }}
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
                <div ref={containerRef}></div>
              </div>
              {popupData.length > 1 ? (
                <div
                  style={{
                    color: "white",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  message {popupData.length - 1} more
                </div>
              ) : null}
              <div
                onClick={handleClearAll}
                style={{
                  color: "white",
                  fontSize: "20px",
                  bottom: "5px",
                  position: "absolute",
                }}
              >
                clear all
              </div>
            </div>
          ) : (
            <div
              onClick={handleOverlayClick}
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
              <div
                style={{
                  width: "75%",
                  maxWidth: "420px",
                  maxHeight: "80%",
                  height: "auto",
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  overflow: "scroll",
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
                    {latestpopupData &&
                      JSON.parse(latestpopupData?.payload || " ").title}
                  </h1>
                  <button
                    onClick={() => {
                      setClickedPopup(popups => popups.slice(0, -1));
                      setPopupData(data => data.slice(0, -1));
                    }}
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
                    latestpopupData &&
                    JSON.parse(latestpopupData?.payload || " ").image
                  }
                />
                <p
                  style={{
                    color: "#000000",
                    fontSize: "18px",
                    textAlign: "start",
                  }}
                >
                  {latestpopupData &&
                    JSON.parse(latestpopupData?.payload || " ").text}
                </p>
              </div>
              {popupData.length > 1 ? (
                <div
                  style={{
                    color: "white",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  message {popupData.length - 1} more
                </div>
              ) : null}

              <div
                onClick={handleClearAll}
                style={{
                  color: "white",
                  fontSize: "20px",
                  bottom: "5px",
                  position: "absolute",
                }}
              >
                clear all
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
