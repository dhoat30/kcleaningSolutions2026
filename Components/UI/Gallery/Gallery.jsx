"use client";
import * as React from "react";
import styled from "@emotion/styled";
import BeforeAfterMasonry from "../BeforeAfterSlider/BeforeAfterMasonry";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import styles from "./Gallery.module.scss";
export default function Gallery({ galleryData, showBriefGallery = false }) {
  const [value, setValue] = React.useState(0);
  if (!galleryData) return null;
  // Extract unique tags for the tabs, and add a "Show All" option
  const uniqueTags = [
    ...Array.from(
      new Set(galleryData.map((item) => item.tag.value)), // Get unique tag values
    ).map((tagValue) => {
      const tag = galleryData.find((item) => item.tag.value === tagValue)?.tag; // Find the first matching tag object
      return tag;
    }),
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Filter gallery items based on selected tab
  const filteredGalleryData = galleryData.filter(
    (item) => item.tag.value === uniqueTags[value].value,
  );

  return (
    <section className={`${styles.section}`}>
      {/* Tabs for filtering */}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs"
        textColor="secondary"
        indicatorColor="secondary"
        className={`${styles.tabsWrapper}`}
      >
        {uniqueTags.map((tag, index) => (
          <Tab key={index} label={tag.label} />
        ))}
      </Tabs>

      {/* Filtered gallery grid */}
      <div className={`${styles.masonryWrapper}`}>
        {filteredGalleryData.map((item, index) => (
          <div key={index} className={`${styles.imageContainer}`}>
            <BeforeAfterMasonry
              priority={index === 0}
              showTitle={false}
              data={{
                beforeImage: item.before_image,
                afterImage: item.after_image,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
