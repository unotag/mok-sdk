import React, { useEffect, useState } from "react";
import { PersonalizedLandingProps } from "../types";
import { getUserChecklist } from "../hooks/useGetChecklist";
import { getPersonalizedLandingDetails } from "../hooks/usePersonalizedLandingDetails";

export const MokPersonalizedLanding = ({
  readKey,
  id,
  isDev,
  isLocal,
}: PersonalizedLandingProps) => {
  const [personalizedDetails, setPersonalizedDetails] = useState<[]>([]);

  const BASE_URL = isDev
    ? "https://dev.mok.one"
    : isLocal
    ? "http://localhost:8080"
    : "https://live.mok.one";

  const fetchPersonalizedLandingProperties = async () => {
    const response = await getPersonalizedLandingDetails(BASE_URL, id, readKey);
    if (response?.success) {
      setPersonalizedDetails(response.data);
    }
  };

  useEffect(() => {
    fetchPersonalizedLandingProperties();
  }, []);

  return <>
    {personalizedDetails.map((item: any, index: any) => {
      item.content.map((item: any, index: any) => {
        if (document.getElementById(item.div_id)) {
          const Element = document.getElementById(item?.div_id);
          if (Element) {
            if (item.type === "text") {
              Element.innerText = item.text
            } else if (item.type === "image") {
              const imageElement = Element as HTMLImageElement;
              imageElement.src = item.url;
            }else if (item.type === "video") {
              const videoElement = Element as HTMLVideoElement;
              videoElement.src = item.url;
              // Optionally, you can also set other attributes for the video element such as controls, autoplay, etc.
              videoElement.controls = true;
              videoElement.autoplay = true;
            }
          }
        }
       })
        
      })}
  </>;
};
