import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import CompareLabel from "./CompareLabel";

export default function BeforeAfter({ data, showTitle }) {
  if (!data.afterImage || !data.beforeImage) return null;
  return (
    <div>
      {showTitle && (
        <Typography component="h2" variant="h3" className="title" color="white">
          Before & After
        </Typography>
      )}

      <ReactCompareSlider
        className="image-wrapper"
        onlyHandleDraggable={true}
        style={{
          paddingBottom: `${
            (data.beforeImage.height / data.beforeImage.width) * 100
          }%`,
          touchAction: "pan-y",
        }}
        itemTwo={
          <>
            <Image
              src={data.beforeImage.url}
              alt={data.beforeImage.alt ? data.beforeImage.alt : "Before image"}
              sizes="(max-width: 1200px) 100vw, 50vw"
              fill
              priority
            />
            <CompareLabel position="right">Before</CompareLabel>
          </>
        }
        itemOne={
          <>
            <Image
              src={data.afterImage.url}
              alt={data.afterImage.alt ? data.afterImage.alt : "After Image"}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 50vw"
            />
            <CompareLabel position="left">After</CompareLabel>
          </>
        }
      />
    </div>
  );
}

