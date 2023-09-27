import { useEffect, useRef, useState } from "react";
import { PopupProps } from "../types";

export const MokPopup = ({ readKey, id, isDev, isLocal }: PopupProps) => {
  const [clickedPopup, setClickedPopup] = useState(false);
  const [popupData, setPopupData] = useState<any>();
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
      setClickedPopup(false);
    }
  };

  useEffect(() => {
    const es = new EventSource(`${BASE_URL}/server/sse`);

    es.addEventListener(`event_${readKey}_${id}`, function (event) {
      setClickedPopup(true);
      setPopupData(JSON.parse(event.data));
    });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = popupData?.html;
    }
  }, [popupData]);

  return (
    <>
      {clickedPopup && (
        <>
          {popupData?.html ? (
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
              }}
            >
              <div
                style={{
                  width: "auto",
                  height: "auto",
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <div ref={containerRef}></div>
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
              }}
            >
              <div
                style={{
                  width: "320px",
                  height: "auto",
                  background: "#fff",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
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
                    {popupData && JSON.parse(popupData?.payload || " ").title}
                  </h1>
                  <button
                    onClick={() => setClickedPopup(false)}
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
                  src={popupData && JSON.parse(popupData?.payload || " ").image}
                />
                <p
                  style={{
                    color: "#000000",
                    fontSize: "18px",
                    textAlign: "start",
                  }}
                >
                  {popupData && JSON.parse(popupData?.payload || " ").text}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
