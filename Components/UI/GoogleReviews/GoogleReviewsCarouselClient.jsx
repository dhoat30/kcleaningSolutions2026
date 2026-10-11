"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Image from "next/image";
import Button from "@mui/material/Button";
import CallMadeOutlinedIcon from "@mui/icons-material/CallMadeOutlined";
import StarIcon from "@mui/icons-material/Star";
import GoogleReviewCard from "./GoogleReviewCard/GoogleReviewCard";
import Typography from "@mui/material/Typography";
import styles from "./GoogleReviewsCarousle.module.scss";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

export default function GoogleReviewsCarousel({ data }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { rootMargin: "200px 0px" });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ AutoScroll plugin
  const autoScroll = useMemo(
    () =>
      AutoScroll({
        speed: 0.6, // increase for faster
        startDelay: 0,
        stopOnInteraction: false, // keep moving after button clicks / drag
        stopOnMouseEnter: false, // IMPORTANT: do NOT pause on carousel hover
        // If your users drag, Embla will stop momentarily then continue
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, active: inView },
    [autoScroll],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // ✅ Pause ONLY when hovering a card
  const handleCardMouseEnter = useCallback(() => {
    if (!emblaApi) return;
    const plugin = emblaApi.plugins()?.autoScroll;
    plugin?.stop?.();
  }, [emblaApi]);

  const handleCardMouseLeave = useCallback(() => {
    if (!emblaApi) return;
    const plugin = emblaApi.plugins()?.autoScroll;
    plugin?.play?.();
  }, [emblaApi]);

  // aggregate rating pulled from the scraped place data
  const placeMeta = data.place;
  const totalScore = placeMeta?.totalScore;
  const reviewsCount = placeMeta?.reviewsCount;
  const placeUrl = placeMeta?.url;

  const summaryStarsJSX = Array.from({ length: 5 }, (_, index) => (
    <StarIcon key={index} sx={{ color: "#FABB05", fontSize: "1.6rem" }} />
  ));

  const testimonialCardsJSX = data.reviews.map((item, index) => {
    return (
      <GoogleReviewCard
        key={index}
        name={item.name}
        description={item.text}
        customerPic={item.reviewerPhotoUrl}
        date={item.publishAt}
        characterLimit={160}
      />
    );
  });

  return (
    <section ref={sectionRef} className={`${styles.section}`} id="google-reviews">
      <Container maxWidth="xl" className={`${styles.container}`}>
        <div className={`${styles.titleRow}`}>
          <Typography
            variant="h2"
            component="h2"
            className="title"
            align="center"
          >
            What Wellington Locals Say
          </Typography>
          <Typography
            variant="h6"
            component="p"
            className="description mt-16 medium"
            align="center"
          >
            The highest rated and most reviewed cleaning team in Wellington —
            every review below is verified on Google.
          </Typography>
          <div className={`${styles.summaryRow} mt-24`}>
            {totalScore && (
              <div className={`${styles.scoreWrapper} flex align-center gap-8`}>
                <Typography
                  variant="h3"
                  component="span"
                  className={`${styles.scoreNumber}`}
                >
                  {Number(totalScore).toFixed(1)}
                </Typography>
                <div className="flex align-center">{summaryStarsJSX}</div>
              </div>
            )}
            {reviewsCount && (
              <Typography
                variant="body1"
                component="p"
                className={`${styles.reviewsCount}`}
              >
                Based on{" "}
                <Image
                  src="/google.png"
                  alt="Google"
                  width={18}
                  height={18}
                  className={`${styles.googleLogoInline}`}
                />{" "}
                <strong>{reviewsCount} Google reviews</strong>
              </Typography>
            )}
            {placeUrl && (
              <Button
                variant="outlined"
                href={placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<CallMadeOutlinedIcon />}
                className={`${styles.allReviewsButton}`}
              >
                Read All Reviews on Google
              </Button>
            )}
          </div>
        </div>
      </Container>
      <div className={`carousel-wrapper embla mt-32 ${styles.fadeEdges}`}>
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">{testimonialCardsJSX}</div>
        </div>
      </div>
    </section>
  );
}
