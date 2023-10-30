import React, { useState } from "react";
import { FloatingPopup } from "../../types";

export default function FloatingPopup({
  popupData,
  handleCloseBtn,
  handleOverlayClick,
}: FloatingPopup) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [initialMousePos, setInitialMousePos] = useState({ x: 0, y: 0 });

  function dragStart(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    e.preventDefault();
    setIsDragging(true);

    if (e.type === "touchstart") {
      setInitialMousePos({
        x: (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX,
        y: (e as React.TouchEvent<HTMLDivElement>).touches[0].clientY,
      });
    } else {
      setInitialMousePos({
        x: (e as React.MouseEvent<HTMLDivElement>).clientX,
        y: (e as React.MouseEvent<HTMLDivElement>).clientY,
      });
    }
  }

  function elementDrag(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) {
    if (!isDragging) return;

    const currentMousePos =
      e.type === "touchmove"
        ? {
            x: (e as React.TouchEvent<HTMLDivElement>).touches[0].clientX,
            y: (e as React.TouchEvent<HTMLDivElement>).touches[0].clientY,
          }
        : {
            x: (e as React.MouseEvent<HTMLDivElement>).clientX,
            y: (e as React.MouseEvent<HTMLDivElement>).clientY,
          };

    const left = position.left - (initialMousePos.x - currentMousePos.x);
    const top = position.top - (initialMousePos.y - currentMousePos.y);

    // Constrain the element's position within the screen boundaries
    const maxX =
      window.innerWidth -
      (document.getElementById("mydiv") as HTMLDivElement).offsetWidth;
    const maxY =
      window.innerHeight -
      (document.getElementById("mydiv") as HTMLDivElement).offsetHeight;

    const constrainedLeft = Math.min(maxX, Math.max(0, left));
    const constrainedTop = Math.min(maxY, Math.max(0, top));

    setPosition({ left: constrainedLeft, top: constrainedTop });
    setInitialMousePos(currentMousePos);
  }

  function closeDragElement() {
    setIsDragging(false);
  }
  return (
    <>
      <div
        onClick={handleOverlayClick}
        id="mydiv"
        className="draggable-div"
        style={{
          width: "200px",
          height: "auto",
          top: position.top + "px",
          left: position.left + "px",
          position: "fixed",
          zIndex: 9999,
          textAlign: "center",
        }}
        onMouseDown={dragStart}
        onMouseMove={elementDrag}
        onMouseUp={closeDragElement}
        onTouchStart={dragStart}
        onTouchMove={elementDrag}
        onTouchEnd={closeDragElement}
      >
        <video
          style={{
            border: "2px solid #ffffff",
            borderRadius: "10px",
            width: "200px",
            height: "auto",
          }}
          // ref={videoRef}
          controls={true}
          autoPlay={true}
          loop
        >
          <source
            src="https://www.w3schools.com/tags/movie.mp4"
            type="video/mp4"
          />
        </video>
        <button
          onClick={handleCloseBtn}
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            background: "white",
            border: "none",
            fontSize: "20px",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
          }}
        >
          &times;
        </button>
      </div>
    </>
  );
}
