import { useEffect, useState } from "react";
import { PopupProps } from "../types";
import NormalPopup from "./PopupModal/NormalPopup";
import FullPagePopup from "./PopupModal/FullPagePopup";
import FloatingPopup from "./PopupModal/FloatingPopup";
import BottomSheetPopup from "./PopupModal/BottomSheetPopup";

export const MokPopup = ({ readKey, id, isDev, isLocal }: PopupProps) => {
  const [clickedPopup, setClickedPopup] = useState<boolean[]>([]);
  const [popupData, setPopupData] = useState<any[]>([]);
  var audio = new Audio();
  // const toggle = () => setClickedPopup(p => !p);

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
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      const newData = [...popupData.slice(0, -1)];
      setPopupData(newData);
      setClickedPopup(popups => popups.slice(0, -1));
      if (newData.length > 0) {
        const latestPopup = JSON.parse(
          newData[newData.length - 1]?.popup_configs
        );
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
            }, parseInt(latestPopup?.number_of_seconds_view));
          }
        }
      }
    }
  };

  const handleClearAll = () => {
    setClickedPopup([]);
    setPopupData([]);
  };

  const handleCloseBtn = async () => {
    audio.pause();

    const newData = [...popupData.slice(0, -1)];
    setPopupData(newData);
    setClickedPopup(popups => popups.slice(0, -1));
    if (newData.length > 0) {
      const latestPopup = JSON.parse(
        newData[newData.length - 1]?.popup_configs
      );
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
    const es = new EventSource(`${BASE_URL}/server/sse`);

    const eventListener = (event: MessageEvent) => {
      const eventData = JSON.parse(JSON.parse(event.data).popup_configs);
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
            switch (JSON.parse(latestPopupData.popup_configs)?.template_type) {
              case "full_page":
                return (
                  <FullPagePopup
                    popupData={popupData}
                    handleClearAll={handleClearAll}
                    handleCloseBtn={handleCloseBtn}
                  />
                );
              case "pip_video":
                return (
                  <FloatingPopup
                    handleOverlayClick={handleOverlayClick}
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
