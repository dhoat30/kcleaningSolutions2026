import Typography from "@mui/material/Typography";
import Image from "next/image";
import React from "react";
import { ReactCompareSlider } from "react-compare-slider";
import CompareLabel from "./CompareLabel";

export default function BeforeAfterMasonry({ data, showTitle, priority }) {
  if (!data.beforeImage) return null;
  return (
    <div>
      {showTitle && (
        <Typography component="h2" variant="h3" className="title" color="white">
          Before & After
        </Typography>
      )}
      { data.afterImage ? 
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
                  alt={data.beforeImage.alt ? data.beforeImage.alt : "Before"}
                  priority={priority}
                  fill
                />
                <CompareLabel position="right">Before</CompareLabel>
              </>
            }
            itemOne={
              <>
                <Image
                  src={data.afterImage.url}
                  alt={data.afterImage.alt ? data.afterImage.alt : "After"}
                  fill
                  priority={priority}
                />
                <CompareLabel position="left">After</CompareLabel>
              </>
            }
          /> : <div className="image-wrapper"   style={{
            paddingBottom: `${
              (data.beforeImage.height / data.beforeImage.width) * 100
            }%`,
          
          }}>
            <Image src={data.beforeImage.url} alt={data.beforeImage.alt ? data.beforeImage.alt : "Before"} fill />
          </div>
      }

    </div>
  );
}
