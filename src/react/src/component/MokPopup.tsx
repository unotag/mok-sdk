import { useEffect, useState } from "react";
import { PopupProps } from "../types";
import NormalPopup from "./PopupModal/NormalPopup";
import FullPagePopup from "./PopupModal/FullPagePopup";
import FloatingPopup from "./PopupModal/FloatingPopup";
import BottomSheetPopup from "./PopupModal/BottomSheetPopup";
import * as serviceWorkerRegistration from "../serviceWokerRegistration";
import { markAllAsRead, markOneAsRead } from "../hooks/useMarkAllRead";

export const MokPopup = ({
  readKey,
  id,
  isDev,
  isLocal,
  writeKey,
}: PopupProps) => {
  const [clickedPopup, setClickedPopup] = useState<boolean[]>([]);
  const [popupData, setPopupData] = useState<any[]>([]);
  let popupTimeout: any | undefined;
  var audio = new Audio();
  // const toggle = () => setClickedPopup(p => !p);
  const BASE_URL = isDev
    ? "https://dev.mok.one"
    : isLocal
    ? "http://localhost:8080"
    : "https://live.mok.one";

  const playAudio = (audioSrc: string) => {
    audio.src = audioSrc;
    audio.play().catch(error => {
      console.error("Failed to play audio:", error);
    });
  };

  const handleAddPopupData = (eventData: any) => {
    if (
      !eventData?.popup_configs?.start_time ||
      !eventData?.popup_configs.end_time ||
      (new Date(eventData?.popup_configs.start_time) <= new Date() &&
        new Date(eventData?.popup_configs.end_time) >= new Date())
    ) {
      if (popupTimeout) {
        clearTimeout(popupTimeout);
      }

      setClickedPopup(popups => [...popups, true]);
      setPopupData(data => [...data, eventData]);

      if (eventData?.popup_configs?.sound) {
        audio.autoplay = true;
        playAudio(eventData?.popup_configs?.sound);
      }

      if (eventData?.popup_configs?.number_of_seconds_view) {
        popupTimeout = setTimeout(() => {
          if (eventData?.payload?.in_app_id) {
            markOneAsRead(
              BASE_URL,
              id,
              writeKey,
              eventData?.payload?.in_app_id
            );
            setClickedPopup(popups => popups.slice(0, -1));
            console.log(popupData.filter(
              data =>
                data?.payload?.in_app_id !== eventData?.payload?.in_app_id
            ))
            console.log(eventData?.popup_configs)
            setPopupData(
              popupData.filter(
                data =>
                  data?.payload?.in_app_id !== eventData?.payload?.in_app_id
              )
            );
            audio.pause();
          }
        }, parseInt(eventData?.popup_configs?.number_of_seconds_view));
      }
    }
  };

  const handleDeletePopupData = (inAppID: string | undefined) => {
    audio.pause()
    const newData = popupData.filter(
      data => data?.payload?.in_app_id !== inAppID
    );
    setPopupData(newData);
    setClickedPopup(popups => popups.slice(0, -1));
    if (inAppID) {
      markOneAsRead(BASE_URL, id, writeKey, inAppID);
    }
    if (newData.length > 0) {
      const latestPopup = newData[newData.length - 1];

      if (
        !latestPopup?.popup_configs?.start_time ||
        !latestPopup?.popup_configs?.end_time ||
        (new Date(latestPopup?.popup_configs?.start_time) <= new Date() &&
          new Date(latestPopup?.popup_configs?.end_time) >= new Date())
      ) {
        if (popupTimeout) {
          clearTimeout(popupTimeout);
        }

        if (latestPopup?.popup_configs?.sound) {
          playAudio(latestPopup?.sound);
        }

        if (latestPopup?.popup_configs?.number_of_seconds_view) {
          popupTimeout = setTimeout(() => {
            if (latestPopup?.payload?.in_app_id) {
              markOneAsRead(
                BASE_URL,
                id,
                writeKey,
                latestPopup?.payload?.in_app_id
              );
              setClickedPopup(popups => popups.slice(0, -1));
              setPopupData(
                popupData.filter(
                  data =>
                    data?.payload?.in_app_id !== latestPopup?.payload?.in_app_id
                )
              );
              audio.pause();
            }
          }, parseInt(latestPopup?.popup_configs?.number_of_seconds_view));
        }
      }
    }
  };

  const cb = (data: any[]) => {
    const newData = data.map(d => {
      const item = d.json_data;
      return {
        id: d.in_app_id,
        html: item.html,
        popup_configs: item.popup_configs,
        payload: {
          category: item.category,
          icon: item.icon,
          image: item.image,
          in_app_click_action: item.in_app_click_action,
          in_app_id: d.in_app_id,
          popup_configs: item.popup_configs,
          text: item.text,
          title: item.title,
        },
      };
    });
    
    newData.map(data => {
      handleAddPopupData(data);
    })
  };

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    in_app_id: string | undefined
  ) => {
    if (event.target === event.currentTarget) {
      handleDeletePopupData(in_app_id);
    }
  };

  const handleClearAll = () => {
    setClickedPopup([]);
    setPopupData([]);
    markAllAsRead(BASE_URL, id, writeKey);
  };

  const handleCloseBtn = async (in_app_id: string | undefined) => {
    handleDeletePopupData(in_app_id);
  };

  useEffect(() => {
    serviceWorkerRegistration.getPendingMessages({
      userId: id,
      readKey,
      BASE_URL,
      writeKey,
      cb,
    });

    const es = new EventSource(`${BASE_URL}/server/sse`);

    const eventListener = (event: MessageEvent) => {
      handleAddPopupData(JSON.parse(event.data));
    };

    es.addEventListener(`event_${readKey}_${id}`, eventListener);

    return () => {
      es.removeEventListener(`event_${readKey}_${id}`, eventListener);
      es.close();
    };
  }, []);

  const latestPopupData = popupData[popupData.length - 1];

  return (
    <>
      {clickedPopup.length > 0 && clickedPopup[clickedPopup.length - 1] && (
        <>
          {(() => {
            switch (latestPopupData?.popup_configs?.template_type) {
              case "full_page":
                return (
                  <FullPagePopup
                    popupData={popupData}
                    latestPopupData={latestPopupData}
                    handleClearAll={handleClearAll}
                    handleCloseBtn={handleCloseBtn}
                  />
                );
              case "pip_video":
                return (
                  <FloatingPopup
                    handleOverlayClick={handleOverlayClick}
                    latestPopupData={latestPopupData}
                    popupData={popupData}
                    handleCloseBtn={handleCloseBtn}
                  />
                );
              case "bottom_sheet":
                return (
                  <BottomSheetPopup
                    popupData={popupData}
                    handleOverlayClick={handleOverlayClick}
                    handleCloseBtn={handleCloseBtn}
                  />
                );
              default:
                return (
                  <NormalPopup
                    popupData={popupData}
                    handleClearAll={handleClearAll}
                    handleOverlayClick={handleOverlayClick}
                    latestPopupData={latestPopupData}
                    handleCloseBtn={handleCloseBtn}
                  />
                );
            }
          })()}
        </>
      )}
    </>
  );
};
