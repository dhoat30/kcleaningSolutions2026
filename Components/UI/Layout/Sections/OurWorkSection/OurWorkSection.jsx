import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Gallery from "@/Components/UI/Gallery/Gallery";
import styles from "./OurWorkSection.module.scss";
export default function OurWorkSection({
  title,
  description,
  beforeAfterGalleryArr,
}) {
  const imageData = (image) => image && ({
    url: image.url, alt: image.alt, width: image.width, height: image.height,
  });
  const galleryData = beforeAfterGalleryArr?.map((item) => ({
    tag: item.tag,
    before_image: imageData(item.before_image),
    after_image: imageData(item.after_image),
  }));
  return (
    <section id="our-work" className={`${styles.section} mt-16`}>
      <Container maxWidth="xl">
        <Container className="title-wrapper" maxWidth="md">
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            className="descripton mt-8"
            align="center"
          >
            {description}
          </Typography>
        </Container>
        <div className="gallery-wrapper">
          <Gallery
            galleryData={galleryData}
            showBriefGallery={true}
          />
        </div>
      </Container>
    </section>
  );
}
