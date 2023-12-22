import React, { useEffect, useState, useCallback } from "react";
import { ICarousel } from "../types";

export const CarouselComponent = ({
  CarouselData,
  CarouselIndex,
}: ICarousel) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = useCallback(() => {
    console.log(CarouselData);
    setActiveIndex(prevIndex =>
      prevIndex === 0
        ? CarouselData?.caraousel_content.length - 1
        : prevIndex - 1
    );
  }, [CarouselData?.caraousel_content.length]);

  const handleNext = useCallback(() => {
    setActiveIndex(prevIndex =>
      prevIndex === CarouselData?.caraousel_content.length - 1
        ? 0
        : prevIndex + 1
    );
  }, [CarouselData?.caraousel_content.length]);

  const handleKeyDown = (event: any) => {
    if (event.key === "ArrowRight") {
      handleNext();
    } else if (event.key === "ArrowLeft") {
      handlePrev();
    }
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     handleNext();
  //   }, 3000);
  //   return () => clearInterval(timer);
  // }, [handleNext]);

  return (
    <div
      className={`carousel-main${CarouselIndex}`}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
      onKeyDown={handleKeyDown}
      // tabIndex='0'
      aria-live="polite"
      aria-roledescription="carousel"
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          transition: "transform 0.5s ease",
        }}
      >
        {CarouselData?.caraousel_content.map((item: any, index: any) => {
          if (item?.url) {
            return (
              <div
                key={index}
                className={`${index === activeIndex ? "active" : ""}`}
                style={{
                  flexShrink: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `translateX(-${activeIndex * 100}%)`,
                  marginTop: "auto",
                  marginBottom: "auto",
                }}
              >
                {item?.type === "image" ? (
                  <img
                    style={{ width: "auto", height: "100%" }}
                    src={item.url}
                    alt={`carousel-image-${index}`}
                  />
                ) : (
                  <video
                    src={item?.url}
                    width="auto"
                    height="100%"
                    controls
                    autoPlay
                  ></video>
                )}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>

      <>
        <button
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.3)",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            left: "0",
          }}
          className="carousel-control prev"
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <polygon points="15.293 3.293 6.586 12 15.293 20.707 16.707 19.293 9.414 12 16.707 4.707 15.293 3.293" />
          </svg>
        </button>
        <button
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0,0,0,0.3)",
            color: "#fff",
            border: "none",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            right: "0",
          }}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <polygon points="7.293 4.707 14.586 12 7.293 19.293 8.707 20.707 17.414 12 8.707 3.293 7.293 4.707" />
          </svg>
        </button>
      </>

      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
          padding: "1rem",
        }}
      >
        {CarouselData?.caraousel_content.map((_: any, index: any) => (
          <button
            key={index}
            style={{
              width: "1rem",
              height: "1rem",
              backgroundColor: `${
                index === activeIndex
                  ? "rgba(255, 255, 255, 1)"
                  : "rgba(255, 255, 255, 0.5)"
              }`,
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              outline: "none",
            }}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === activeIndex}
          ></button>
        ))}
      </div>
    </div>
  );
};
