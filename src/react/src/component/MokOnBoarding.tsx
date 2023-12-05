import React, { useEffect, useState } from "react";
import { MokOnBoardingProps } from "../types";
import ReactDOM from "react-dom";
import { CarouselComponent } from "./CarouselComponent";
import { getOnBoarding } from "../hooks/useGetOnBoarding";

interface MyData {
  ClientId: string;
  comment: null | string;
  content: { type: string; url: string; html: any }[];
  created_at: string;
  is_active: boolean;
  is_fullscreen: boolean;
  onboarding_id: string;
  org_id: string;
  updated_at: string;
}

export const MokOnBoarding = ({
  readKey,
  id,
  isDev,
  isLocal,
}: MokOnBoardingProps) => {
  const [onBoardingData, setOnBoardingData] = useState<MyData[]>([]);
  const [activeIndex, setActiveIndex] = useState<any>(0);
  const BASE_URL = isDev
    ? "https://dev.mok.one"
    : isLocal
    ? "http://localhost:8080"
    : "https://live.mok.one";

  const handleSkipOnBoarding = (onboarding_id: any) => {
    const newData = onBoardingData.filter(
      (data: any) => data?.onboarding_id !== onboarding_id
    );

    setActiveIndex(0);
    setOnBoardingData(newData);
  };

  const fetchOnBoardingDetails = async () => {
    const response = await getOnBoarding(BASE_URL, id, readKey);

    const filteredData = response.data.map((item: any) => ({
      ...item,
      content: item.content.filter((contentItem: any) => {
        if (contentItem.type === "html") {
          return true; // Include items with type 'html'
        } else {
          return contentItem.url !== null; // Exclude items with null url
        }
      }),
    }));

    // Set the filtered data to OnBoardingData
    setOnBoardingData(filteredData);
  };

  useEffect(() => {
    fetchOnBoardingDetails();
  }, []);

  const latestOnBoarding = onBoardingData[onBoardingData.length - 1];

  return (
    <>
      {latestOnBoarding && (
        <>
          {latestOnBoarding?.is_fullscreen ? (
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
                onClick={() =>
                  handleSkipOnBoarding(latestOnBoarding?.onboarding_id)
                }
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "50%",
                  // boxShadow: "rgba(0,0,0,0.2) 0px 0px 10px",
                  fontSize: "20px",
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  zIndex: "9999",
                }}
              >
                skip
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
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {(() => {
                  switch (latestOnBoarding?.content[activeIndex]?.type) {
                    case "image":
                      return (
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={latestOnBoarding?.content[activeIndex]?.url}
                        />
                      );
                    case "video":
                      return (
                        <video
                          src={latestOnBoarding?.content[activeIndex].url}
                          width="100%"
                          height="100%"
                          controls
                          autoPlay
                        ></video>
                      );
                    case "html":
                      return (
                        <div
                          style={{ width: "100%" }}
                          dangerouslySetInnerHTML={{
                            __html:
                              latestOnBoarding?.content[activeIndex]?.html
                                .templateCode,
                          }}
                        ></div>
                      );
                    default:
                      return (
                        <img
                          style={{ width: "100%", height: "100%" }}
                          src={latestOnBoarding?.content[activeIndex]?.url}
                        />
                      );
                  }
                })()}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  zIndex: "9999",
                  width: "100%",
                }}
              >
                <button
                  style={{
                    backgroundColor: "#7366ff",
                    border: "none",
                    color: "white",
                    padding: "10px 26px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    margin: "4px 2px",
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    if (activeIndex > 0) {
                      setActiveIndex(activeIndex - 1);
                    }
                  }}
                >
                  Prev
                </button>
                <div
                  style={{ display: "flex", alignSelf: "center", gap: "4px" }}
                >
                  {latestOnBoarding.content.map((item: any, index: any) => (
                    <span
                      style={{
                        height: "12px",
                        width: "12px",
                        backgroundColor: `${
                          index === activeIndex
                            ? "rgba(255, 255, 255, 1)"
                            : "rgba(255, 255, 255, 0.5)"
                        }`,
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></span>
                  ))}
                </div>
                <button
                  style={{
                    backgroundColor: "#7366ff",
                    border: "none",
                    color: "white",
                    padding: "10px 26px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    margin: "4px 2px",
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    if (activeIndex < latestOnBoarding?.content.length - 1) {
                      setActiveIndex(activeIndex + 1);
                    } else {
                      handleSkipOnBoarding(latestOnBoarding?.onboarding_id);
                    }
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
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
                justifyContent: "center",
                zIndex: "9999",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  top: "50%",
                  width: "75%",
                  maxWidth: "420px",
                  maxHeight: "70%",
                  height: "auto",
                  background: "rgb(255, 255, 255)",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                  transform: `translate(-50%, -50%) scale(1)`,
                  position: "fixed",
                  left: "50%",
                  overflow: "auto",
                  zIndex: 99000,
                  transition: "2s",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: "20px",
                      fontWeight: "normal",
                      flexDirection: "row",
                      justifyContent: "end",
                    }}
                    onClick={() =>
                      handleSkipOnBoarding(latestOnBoarding?.onboarding_id)
                    }
                  >
                    <div style={{ cursor: "pointer" }}>skip</div>
                  </div>
                  {(() => {
                    switch (latestOnBoarding?.content[activeIndex]?.type) {
                      case "image":
                        return (
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={latestOnBoarding?.content[activeIndex]?.url}
                          />
                        );
                      case "video":
                        return (
                          <video
                            src={latestOnBoarding?.content[activeIndex].url}
                            width="100%"
                            height="100%"
                            controls
                            autoPlay
                          ></video>
                        );
                      case "html":
                        return (
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                latestOnBoarding?.content[activeIndex]?.html
                                  .templateCode,
                            }}
                          ></div>
                        );
                      default:
                        return (
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={latestOnBoarding?.content[activeIndex]?.url}
                          />
                        );
                    }
                  })()}
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      style={{
                        backgroundColor: "#7366ff",
                        border: "none",
                        color: "white",
                        padding: "10px 26px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        margin: "4px 2px",
                        cursor: "pointer",
                        borderRadius: "10px",
                      }}
                      onClick={() => {
                        if (activeIndex > 0) {
                          setActiveIndex(activeIndex - 1);
                        }
                      }}
                    >
                      Prev
                    </button>
                    <div
                      style={{
                        display: "flex",
                        alignSelf: "center",
                        gap: "4px",
                      }}
                    >
                      {latestOnBoarding?.content.map(
                        (item: any, index: any) => (
                          <span
                            style={{
                              height: "12px",
                              width: "12px",
                              backgroundColor: `${
                                index === activeIndex
                                  ? "rgba(88, 88, 88, 1)"
                                  : "rgba(88, 88, 88, 0.5)"
                              }`,
                              borderRadius: "50%",
                              display: "inline-block",
                            }}
                          ></span>
                        )
                      )}
                    </div>
                    <button
                      style={{
                        backgroundColor: "#7366ff",
                        border: "none",
                        color: "white",
                        padding: "10px 26px",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        margin: "4px 2px",
                        cursor: "pointer",
                        borderRadius: "10px",
                      }}
                      onClick={() => {
                        if (
                          activeIndex <
                          latestOnBoarding?.content.length - 1
                        ) {
                          setActiveIndex(activeIndex + 1);
                        } else {
                          handleSkipOnBoarding(latestOnBoarding?.onboarding_id);
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
