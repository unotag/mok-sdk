import React, { useEffect, useState } from "react";
import { CarouselProps, CheckListPopupProps } from "../types";
import { getCarouselDetails } from "../hooks/useGetCarouselDetails";
import ReactDOM from "react-dom";
import { CarouselComponent } from "./CarouselComponent";

type dataType = {
  org_id: string;
  created_at: string;
  updated_at: string;
  ClientId: string;
  div_id: string;
  caraousel_content: { type: string; url: string | null }[];
};

export const MokCarousel = ({
  readKey,
  id,
  isDev,
  isLocal,
}: CarouselProps) => {

  const [carouselDetails, setCarouselDetails] = useState<dataType[]>([]);

  const BASE_URL = isDev
    ? "https://dev.mok.one"
    : isLocal
    ? "http://localhost:8080"
    : "https://live.mok.one";

  const fetchCarouselDetails = async () => {
    const response = await getCarouselDetails(BASE_URL, id, readKey);

    const combinedContentMap = new Map<string, dataType>();

    // Filter out unique div_id entries and combine carousel content
    response.data.forEach((entry: dataType) => {
      const { div_id, caraousel_content } = entry;

      if (!combinedContentMap.has(div_id)) {
        combinedContentMap.set(div_id, {
          ...entry,
          caraousel_content: filterNonNullUrls(caraousel_content),
        });
      } else {
        const existingEntry = combinedContentMap.get(div_id);
        if (existingEntry) {
          existingEntry.caraousel_content.push(
            ...filterNonNullUrls(caraousel_content)
          );
        }
      }
    });

    function filterNonNullUrls(contentArray: any) {
      return contentArray.filter((item: any) => item.url !== null);
    }

    const combinedDataArray = Array.from(combinedContentMap.values());

    setCarouselDetails(combinedDataArray);
  };

  useEffect(() => {
    fetchCarouselDetails();
  }, []);

  return (
    <>
      {carouselDetails.map((item: any, index: any) => {
        if (document.getElementById(item.div_id)) {
          const Element = document.getElementById(item?.div_id);

          if (Element) {
            ReactDOM.render(
              <CarouselComponent CarouselData={item} CarouselIndex={index} />,
              Element
            );
          }
        }
      })}
    </>
  );
};
