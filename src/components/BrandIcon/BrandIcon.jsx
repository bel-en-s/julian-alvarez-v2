"use client";

const BrandIcon = ({ width, height, style, ...props }) => {
  return (
    <div
      style={{
        position: "relative",
        width: width || "100%",
        height: height || "100%",
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          maskImage: "url(/logo.png)",
          WebkitMaskImage: "url(/logo.png)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <video
          src="/home/julian-chiquito.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
    </div>
  );
};

export default BrandIcon;
