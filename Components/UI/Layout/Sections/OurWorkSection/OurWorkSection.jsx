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
            variant="h5"
            component="div"
            className="descripton mt-8"
            align="center"
          >
            {description}
          </Typography>
        </Container>
        <div className="gallery-wrapper">
          <Gallery galleryData={beforeAfterGalleryArr} />
        </div>
      </Container>
    </section>
  );
}
