import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import styles from "./SolutionSection.module.scss";
import Image from "next/image";

export default function SolutionSection({
  subtitle,
  title,
  description,
  ctaArray,
  items,
}) {
  return (
    <section className={`${styles.section}`}>
      <Container maxwidth="xl" className={styles.container}>
        <Container maxWidth="md" className={`${styles.titleContainer}`}>
          <Typography
            className="center-align mb-8 medium uppercase"
            variant="h5"
            component="div"
            color={"var(--dark-on-surface)"}
          >
            {subtitle}
          </Typography>
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className={`heading-1 dark-version-font colored-text center-align uppercase ${styles.title}`}
          />
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={`heading-5 center-align  mt-24 dark-version-font`}
          />
        </Container>

        <Container maxWidth="lg" className={`${styles.descriptionContainer}`}>
          {items && items.length > 0 && (
            <Container
              maxWidth="lg"
              className={`${styles.itemsContainer} flex flex-wrap  mt-56 mb-56`}
            >
              {items.map((singleItem, index) => {
                return (
                  <div
                    className={`${styles.item} flex align-center`}
                    key={index}
                  >
                    {singleItem.image && (
                      <Image
                        src={singleItem.image.url}
                        alt={
                          singleItem.image.alt
                            ? singleItem.image.alt
                            : singleItem.title
                        }
                        width="80"
                        height="80"
                      />
                    )}
                    <Typography
                      className={`center-align mt-24 bold ${styles.title}`}
                      variant="h6"
                      component="h3"
                      color="var(--dark-on-surface)"
                    >
                      {singleItem.title}
                    </Typography>
                    <Typography
                      className={`center-align mt-8 ${styles.description}`}
                      variant="body1"
                      component="div"
                      color="var(--dark-on-surface-variant)"
                    >
                      {singleItem.description}
                    </Typography>
                  </div>
                );
              })}
            </Container>
          )}

          <div className={`${styles.btnWrapper} flex justify-center mt-32`}>
            {ctaArray &&
              ctaArray.map((cta, index) => {
                return (
                  <Link href={cta.link.url} key={index}>
                    <Button
                      size="large"
                      variant="contained"
                      color="primary"
                      disableElevation
                    >
                      {cta.link.title}
                    </Button>
                  </Link>
                );
              })}
          </div>
        </Container>
      </Container>
    </section>
  );
}
