import { useEffect, useState } from "react";
import { PopupProps } from "../types";
import * as serviceWorkerRegistration from '../serviceWokerRegistration';
import { markAllAsRead, markOneAsRead } from "../hooks/useMarkAllRead";

export const MokPopup = ({ readKey, id, isDev, isLocal, writeKey }: PopupProps) => {
  const [clickedPopup, setClickedPopup] = useState<boolean[]>([]);
  const [popupData, setPopupData] = useState<any[]>([]);

  const cb = (data: any[]) => {
    const newData = data.map((d) => {
      const item = JSON.parse(d.json_data)
      return {
        id: d.in_app_id,
        html: item.html,
        popup_configs: item.popup_configs,
        payload: {
          category: item.category,
          icon: item.icon,
          image: item.image,
          in_app_click_action: item.in_app_click_action,
          popup_configs: item.popup_configs,
          text: item.text,
          title: item.title,
        }
      }
    })

    setClickedPopup([...Array(...newData.map(s => true))]);
    setPopupData(newData)
  }

  const BASE_URL = isDev
    ? "https://dev.mok.one"
    : isLocal
      ? "http://localhost:8080"
      : "https://live.mok.one";

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    in_app_id: string | undefined
  ) => {
    if (event.target === event.currentTarget) {
      setClickedPopup(popups => popups.slice(0, -1));
      setPopupData(data => data.slice(0, -1));
      if (in_app_id) {
        markOneAsRead(BASE_URL, id, writeKey, in_app_id)
      }
    }
  };

  const handleClearAll = () => {
    setClickedPopup([]);
    setPopupData([]);
    markAllAsRead(BASE_URL, id, writeKey)
  };

  useEffect(() => {
    serviceWorkerRegistration.getPendingMessages({ userId: id, readKey, BASE_URL, writeKey, cb });

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

  const latestpopupData = popupData[popupData.length - 1];

  return (
    <>
      {clickedPopup.length > 0 && clickedPopup[clickedPopup.length - 1] && (
        <>
          {latestpopupData?.html ? (
            <div
              onClick={(e) => handleOverlayClick(e, latestpopupData.id)}
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
                        key={index}
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
                          transform: `translate(-50%, -50%) scale(${1 - index * 0.02
                            })`,
                          position: "fixed",
                          left: "50%",
                          overflow: "auto",
                          zIndex: 99000 - index,
                          transition: "2s",
                        }}
                      >
                        <button
                          onClick={() => {
                            setClickedPopup(popups => popups.slice(0, -1));
                            setPopupData(data => data.slice(0, -1));
                            if (item.id) {
                              markOneAsRead(BASE_URL, id, writeKey, item.id)
                            }
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
                        <div
                          dangerouslySetInnerHTML={{
                            __html: popupData[popupData.length - 1]?.html,
                          }}
                        ></div>
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
              onClick={(e) => handleOverlayClick(e, latestpopupData.id)}
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
                        key={index}
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
                          transform: `translate(-50%, -50%) scale(${1 - index * 0.02
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
        </>
      )}
    </>
  );
};
