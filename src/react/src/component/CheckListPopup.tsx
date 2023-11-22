import React, { useEffect, useState } from "react";
import { CheckListPopupProps } from "../types";
import { getUserChecklist } from "../hooks/useGetChecklist";

export const CheckListPopup = ({
  readKey,
  id,
  isDev,
  isLocal,
  writeKey,
}: CheckListPopupProps) => {
  const [checklistDetails, setChecklistDetails] = useState<[]>([]);
  const [checklistCount, setChecklistCount] = useState<any>(0);
  const BASE_URL = isDev
    ? "https://dev.mok.one"
    : isLocal
    ? "http://localhost:8080"
    : "https://live.mok.one";

  const fetchUserProperties = async () => {
    const response = await getUserChecklist(BASE_URL, id, readKey);
    if (response?.success) {
      setChecklistCount(
        response.data.filter((item: any) => item.completed).length
      );
      setChecklistDetails(response.data);
    }
  };

  useEffect(() => {
    const checklistSession = sessionStorage.getItem('checklist_token');
    
    if (!checklistSession || checklistSession !== 'true') {
      fetchUserProperties();
    }
  }, []);

  const handleCloseBtn = () => {
    sessionStorage.setItem('checklist_token', 'true');
    setChecklistDetails([]);
  };

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      handleCloseBtn();
    }
  };

  return (
    <>
      {checklistDetails.length > 0 && (
        <div
          onClick={(event) => handleOverlayClick(event)}
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
              >
                {/* <div>onboarding</div> */}
                <div style={{cursor:"pointer"}} onClick={handleCloseBtn}>&times;</div>
              </div>
              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  color: "gray",
                }}
              >
                <div>
                  {checklistCount}/{checklistDetails.length}
                </div>
                <div
                  style={{
                    margin: "auto",
                    width: "86%",
                    borderRadius: "10px",
                    overflow: "hidden",
                    background: "#e9ecef",
                  }}
                >
                  <div
                    style={{
                      width: `${
                        (checklistCount * 100) / checklistDetails.length
                      }%`,
                      height: "8px",
                      backgroundColor: "#7366ff",
                      color: "#fff",
                      textAlign: "center",
                      lineHeight: "30px",
                      transition: "width 0.3s ease",
                    }}
                  >
                    {/* {Math.round(progressValue)}% */}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {checklistDetails?.map((item: any, index: any) => (
                  <div key={index}>
                    <div
                      style={{
                        display: "flex",
                        borderBottom: `${
                          checklistDetails.length === index + 1
                            ? "0px solid gray"
                            : "1px solid gray"
                        }`,
                        paddingBottom: `${
                          checklistDetails.length === index + 1 ? "0px" : "10px"
                        }`,
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      {item?.completed ? (
                        <svg
                          className="svg-icon"
                          style={{
                            width: "22px",
                            alignSelf: "start",
                            color: "#7366ff",
                            height: "22px",
                            verticalAlign: "middle",
                            fill: "currentColor",
                            overflow: "hidden",
                          }}
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M341.436 432.964L283.2 491.2l187.2 187.2 416-416-58.236-58.236L470.4 559.836l-128.964-126.872zM844.8 512c0 183.036-149.766 332.8-332.8 332.8S179.2 695.036 179.2 512 328.964 179.2 512 179.2c31.2 0 62.4 4.164 91.528 12.482L668 127.2C620.164 106.4 568.164 96 512 96 283.2 96 96 283.2 96 512s187.2 416 416 416 416-187.2 416-416h-83.2z" />
                        </svg>
                      ) : (
                        <svg
                          fill="gray"
                          style={{
                            width: "22px",
                            alignSelf: "start",
                            color: "gray",
                            height: "22px",
                            verticalAlign: "middle",
                            fill: "currentColor",
                            overflow: "hidden",
                          }}
                          version="1.1"
                          id="Layer_1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 330 330"
                        >
                          <path
                            id="XMLID_520_"
                            d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.982,0,165,0z M165,300
                       C90.561,300,30,239.44,30,165S90.561,30,165,30c74.439,0,135,60.561,135,135S239.439,300,165,300z"
                          />
                        </svg>
                      )}
                      <div
                        style={{
                          marginLeft: "10px",
                          width: "90%",
                          textAlign: "start",
                        }}
                      >
                        <div style={{ fontSize: "16px", color: "black" }}>
                          {item?.label}
                        </div>
                        {/* <div style={{ fontSize: "13px", color: "gray" }}>
                          {item?.value}
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
