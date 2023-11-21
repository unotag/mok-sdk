import React, { useEffect, useState } from "react";
import { FullPagePopup } from "../../types";

export default function FullPagePopup({
  popupData,
  handleClearAll,
  handleCloseBtn,
  latestPopupData,
}: FullPagePopup) {
  const [boxStyle, setBoxStyle] = useState({ top: 0, left: 0 });
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });

  const calculateBoxPosition = () => {
    const div = document.querySelector(".show-modal");
    if (div) {
      const divRect = div.getBoundingClientRect();
      const padding = 8;
      const boxTop = divRect.top + window.scrollY - padding;
      const boxLeft = divRect.left + window.scrollX - padding;
      setDivDimensions({
        width: divRect.width + 2 * padding,
        height: divRect.height + 2 * padding,
      });
      setBoxStyle({ top: boxTop, left: boxLeft });
    }
  };

  useEffect(() => {
    calculateBoxPosition();
    // const { body, documentElement } = document;
    window.addEventListener("resize", calculateBoxPosition);
    return () => {
      window.removeEventListener("resize", calculateBoxPosition);
    };
  }, []);
  return (
    <>
      <div
        style={{
          height: Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          ),
          inset: "0px",
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.5",
          mixBlendMode: "hard-light",
        }}
      >
        <button
          // onClick={()=>handleCloseBtn(latestPopupData?.payload?.in_app_id)}
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            background: "white",
            border: "none",
            fontSize: "22px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
          }}
        >
          &times;
        </button>
        <div
          className="customDiv"
          style={{
            position: "absolute",
            backgroundColor: "gray",
            opacity: 1,
            top: boxStyle.top,
            left: boxStyle.left,
            width: divDimensions.width,
            height: divDimensions.height,
            borderRadius: "4px",
            // display: "flex",
            // justifyContent: "center"
          }}
        >
          <div
            style={{
              position: "relative",
              top: - (150 + 60 +10),
              zIndex: "99999",
              background: "transparent",
              display:"flex",
              flexDirection:"column"
            }}
          >
          <div
            className='custom-class'
            style={{
              height: "150px",
              overflow: "auto",
              // top: divDimensions.height + 10,
              // left: divDimensions.width + 10,
              // right: divDimensions.width + 10,
              zIndex: "99999",
              background: "transparent",
              borderRadius: "10px",
              padding: "10px",
              width: divDimensions.width
            }}>
            
            <div>
            Keep in mind that the level of support for user-select can vary among different browsers, so it's essential to test its behavior in various browsers to ensure consistent results.
            </div>
            </div>
           <div style={{

              height: "60px",
              // overflow: "auto",
              // top: divDimensions.height + 10,
              // left: divDimensions.width + 10,
              // right: divDimensions.width + 10,
              zIndex: "99999",
              background: "transparent",
              borderRadius: "10px",
              // padding: "10px",
              width: divDimensions.width,
              marginTop: "10px",
              textAlign:"center"
            }}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="50px" height="50px" viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M2481 5109 c-78 -24 -147 -85 -183 -164 l-23 -50 -3 -1504 -2 -1504
-129 126 c-71 69 -148 135 -172 148 -53 27 -153 36 -212 19 -64 -17 -135 -76
-171 -140 -27 -49 -31 -64 -31 -135 0 -128 3 -132 447 -569 436 -429 449 -439
567 -439 126 0 131 4 563 444 251 255 392 406 408 437 32 61 35 187 6 242 -75
140 -216 201 -357 155 -47 -16 -74 -37 -196 -158 l-143 -140 -2 1509 -3 1509
-23 51 c-27 59 -79 113 -140 144 -49 26 -149 35 -201 19z"/>
                <path d="M2433 679 c-70 -27 -152 -103 -188 -176 -27 -51 -30 -68 -30 -148 0
-82 3 -97 33 -157 38 -77 92 -130 171 -166 80 -38 202 -38 282 0 79 36 133 89
171 166 30 60 33 75 33 157 0 80 -3 97 -30 148 -37 75 -118 149 -190 176 -74
28 -180 27 -252 0z"/>
              </g>
            </svg>
            </div>
            </div>
        </div>
      </div>
    </>
  );
}
