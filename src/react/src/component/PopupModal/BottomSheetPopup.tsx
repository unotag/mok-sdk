import React, { useRef, useState, MouseEvent, TouchEvent } from "react";
import { BottomSheetPopup } from "../../types";
// import "./BottomSheetPopup.css";

export default function BottomSheetPopup({
  popupData,
  handleOverlayClick,
  handleCloseBtn,
}: BottomSheetPopup) {
  const openSheetButtonRef = useRef<HTMLDivElement | null>(null);
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const sheetContentsRef = useRef<HTMLDivElement | null>(null);
  const draggableAreaRef = useRef<HTMLDivElement | null>(null);

  const [sheetHeight, setSheetHeight] = useState<number>(50); // in vh
  const [isSheetShown, setIsSheetShown] = useState<boolean>(true); // Set it to initially not shown
  const [dragPosition, setDragPosition] = useState<number | null>(null); // Store drag position


  return (
    <>
      {popupData[popupData.length - 1]?.html ? (
        <div
          id="sheet"
          // className="column items-center justify-end bottom-sheet" // Add appropriate CSS classes
          aria-hidden
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1",
            alignItems: "center",
            justifyContent: "end",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "#fff",
            boxShadow: "0px -5px 10px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease-in-out",
          }}
          ref={sheetRef}
        >
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              zIndex: "10",
            }}
            onClick={() => setIsSheetShown(false)}
          ></div>
          <div
            // className="contents"
            ref={sheetContentsRef}
            style={{
              height: `${sheetHeight}vh`,
              zIndex: "11",
              width: "95%",
              borderRadius: "10px 10px 0px 0px",
              background: "#fff",
              overflow: "auto",
            }}
            // onMouseMove={onDragMove}
            // onTouchMove={onDragMove}
            // onMouseUp={onDragEnd}
            // onTouchEnd={onDragEnd}
          >
            {/* <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                background: "#f5f5f5",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <div
                // className="draggable-area"
                style={{
                  cursor: "grab",
                  width: "30px",
                  height: "5px",
                  background: "#ccc",
                  position: "relative",
                  borderRadius: "10px",
                }}
                ref={draggableAreaRef}
                // onMouseDown={onDragStart}
                // onTouchStart={onDragStart}
              >
                <div
                  style={{
                    background: "#333",
                    width: "12px",
                    height: "3px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    borderRadius: "2px",
                  }}
                  className="draggable-thumb"
                ></div>
              </div>
              <button
                // className="close-sheet"
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
                type="button"
                title="Close the sheet"
                onClick={() => setIsSheetShown(false)}
              >
                &times;
              </button>
            </header> */}
            <main style={{padding:"20px"}}>
            <div
              dangerouslySetInnerHTML={{
                __html: popupData[popupData.length - 1].html,
              }}
            ></div>
            </main>
          </div>
        </div>
      ) : null}
    </>
  );
}
