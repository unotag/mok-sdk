import { useEffect, useState } from "react";
import { PopupProps } from "../types";
import NormalPopup from "./PopupModal/NormalPopup";
import FullPagePopup from "./PopupModal/FullPagePopup";
import FloatingPopup from "./PopupModal/FloatingPopup";
import BottomSheetPopup from "./PopupModal/BottomSheetPopup";
import * as serviceWorkerRegistration from '../serviceWokerRegistration';
import { markAllAsRead, markOneAsRead } from "../hooks/useMarkAllRead";

export const MokPopup = ({ readKey, id, isDev, isLocal, writeKey }: PopupProps) => {
  const [clickedPopup, setClickedPopup] = useState<boolean[]>([]);
  const [popupData, setPopupData] = useState<any[]>([]);
  var audio = new Audio();
  // const toggle = () => setClickedPopup(p => !p);

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

  let popupTimeout: any | undefined;
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

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    // in_app_id: string | undefined
  ) => {
    if (event.target === event.currentTarget) {
      handleCloseBtn();
      // if (in_app_id) {
      //   markOneAsRead(BASE_URL, id, writeKey, in_app_id)
      // }
    }
  };

  const handleClearAll = () => {
    setClickedPopup([]);
    setPopupData([]);
    markAllAsRead(BASE_URL, id, writeKey)
  };

  const handleCloseBtn = async () => {
    audio.pause();
    const popdata = popupData.pop()
    console.log(popdata)
    const newData = [...popupData.slice(0, -1)];
    setPopupData(newData);
    setClickedPopup(popups => popups.slice(0, -1));
    if (newData.length > 0) {
      const latestPopup = newData[newData.length - 1]?.popup_configs
      if (latestPopup?.sound) {
        playAudio(latestPopup?.sound);
      }
      if (
        !latestPopup?.start_time ||
        !latestPopup?.end_time ||
        (new Date(latestPopup?.start_time) <= new Date() &&
          new Date(latestPopup?.end_time) >= new Date())
      ) {
        if (popupTimeout) {
          clearTimeout(popupTimeout);
        }

        if (latestPopup?.number_of_seconds_view) {
          popupTimeout = setTimeout(() => {
            setClickedPopup(popups => popups.slice(0, -1));
            setPopupData(data => data.slice(0, -1));
            audio.pause();
          }, parseInt(latestPopup?.number_of_seconds_view));
        }
      }
    }
  };

  useEffect(() => {
    serviceWorkerRegistration.getPendingMessages({ userId: id, readKey, BASE_URL, writeKey, cb });

    const es = new EventSource(`${BASE_URL}/server/sse`);

    const eventListener = (event: MessageEvent) => {
      console.log(JSON.parse(event.data))
      const eventData = JSON.parse(event.data)?.popup_configs;
      if (
        !eventData?.start_time ||
        !eventData?.end_time ||
        (new Date(eventData?.start_time) <= new Date() &&
          new Date(eventData?.end_time) >= new Date())
      ) {
        if (popupTimeout) {
          clearTimeout(popupTimeout);
        }

        setClickedPopup(popups => [...popups, true]);
        setPopupData(data => [...data, JSON.parse(event.data)]);
        if (eventData?.sound) {
          audio.autoplay = true;
          playAudio(eventData?.sound);
        }
        if (eventData?.number_of_seconds_view) {
          popupTimeout = setTimeout(() => {
            setClickedPopup(popups => popups.slice(0, -1));
            setPopupData(data => data.slice(0, -1));
            audio.pause();
          }, parseInt(eventData.number_of_seconds_view));
        }
      }
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
