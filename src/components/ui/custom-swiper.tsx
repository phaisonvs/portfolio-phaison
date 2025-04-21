import React from "react";
import { Swiper as SwiperOriginal } from "swiper/react";
import type { SwiperProps } from "swiper/react";

/**
 * Um wrapper para o componente Swiper que garante que ele respeite a largura máxima do container
 */
export function CustomSwiper({
  children,
  ...props
}: SwiperProps & { children: React.ReactNode }) {
  return (
    <div
      className="custom-swiper-container"
      style={{
        maxWidth: "100%",
        width: "100%",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <SwiperOriginal
        {...props}
        style={{
          ...(props.style || {}),
          maxWidth: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {children}
      </SwiperOriginal>
    </div>
  );
}
