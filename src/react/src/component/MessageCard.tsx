import React from "react";

import { MessageCardProps } from "../types";
import { formatDate } from "../utils";
import { markAsRead } from "../hooks/useMarkAsRead";

export const MessageCard = ({
  data,
  textColor,
  textStyles,
  ruleStyles,
  titleStyles,
  id,
  readKey,
  writeKey,
  baseUrl
}: MessageCardProps) => {
  

  const isValidUrl = (clickAction: string) => {
    try {
      return Boolean(new URL(clickAction));
    } catch (e) {
      return false;
    }
  };

  const json_data = JSON.parse(data.json_data);

  const handleCLick = (
    clickAction: string,
    inAppId: string,
    status: boolean
  ) => {
    if (!status) {
      markAsRead(baseUrl, id, inAppId, writeKey);
    }
    if (isValidUrl(clickAction)) {
      window.open(clickAction, "_blank", "noreferrer");
    } else {
      window.location.replace(clickAction);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: data.read ? "#f2f6fc" : "#ffffff",
        }}
        onClick={(e) => {
          e.currentTarget.style.backgroundColor = '#f2f6fc';
          handleCLick(json_data.in_app_click_action, data.in_app_id, data.read);
        }}
      >
        <div>
          {json_data.icon && (
            <img
              src={json_data.icon}
              alt={"icon_" + json_data.icon}
              style={{
                borderRadius: "20px",
                width: "30px",
                height: "fit-content",
              }}
            />
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "13px",
              fontWeight: data.read ? "500" : "700",
              textAlign: "start",
              ...titleStyles,
            }}
          >
            {json_data.title}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: textColor,
              fontSize: "12px",
              textAlign: "start",
            }}
          >
            <div style={{ ...textStyles }}>{json_data.text}</div>
            <div style={{ fontSize: "12px", ...textStyles }}>
              {formatDate(json_data.time)}
            </div>
          </div>
          {json_data.image && (
            <img
              src={json_data.image}
              alt={"img_" + json_data.image}
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "fit-content",
              }}
            />
          )}
        </div>
      </div>
      <hr style={{ opacity: "0.5", ...ruleStyles, color: textColor }} />
    </>
  );
};
