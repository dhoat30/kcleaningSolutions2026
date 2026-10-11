import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import BeforeAfter from "../../../BeforeAfterSlider/BeforeAfter";
import GetQuoteForm from "@/Components/UI/Forms/GetQuoteForm";
import Video from "@/Components/UI/Video/Video";
import reviewsData from "@/data/google-reviews.json";
import { cleaningPhone, cleaningPhoneHref } from "@/utils/cleaningContact";
import styles from "./FormSection.module.scss";

const defaultServices = [
  "Deep cleaning",
  "Oven cleaning",
  "Window cleaning",
  "Carpet cleaning",
  "Move-out cleaning",
  "House cleaning",
];

function HeroTitle({ title }) {
  if (/<[a-z][\s\S]*>/i.test(title)) {
    return (
      <h1
        className={styles.title}
        dangerouslySetInnerHTML={{
          __html: title.replace(/<\/?h[1-6][^>]*>/gi, "").trim(),
        }}
      />
    );
  }

  return (
    <h1 className={styles.title}>
      {title.split(/(Wellington)/i).map((part, index) =>
        /^Wellington$/i.test(part) ? <span key={index}>{part}</span> : part,
      )}
    </h1>
  );
}

export default function FormSection({
  title = "Professional Cleaners in Wellington",
  subtitle = "Your local Wellington cleaning team",
  tagline = "A cleaner home. More time for you.",
  description,
  usp,
  graphic,
  formName,
  imageCaption = "Professional care for the place you call home.",
}) {
  const services = (usp?.text_usp || [])
    .map((item) => item.value?.trim())
    .filter(Boolean)
    .filter((value) => !/insured|guarantee|highest rated|most reviewed/i.test(value));
  const review = reviewsData.reviews?.[0];
  let graphicComponent = null;

  if (graphic?.graphic_type === "image" && graphic.image?.url) {
    graphicComponent = (
      <div className={styles.imageWrapper}>
        <Image
          src={graphic.image.url}
          alt={graphic.image.alt || "Professional cleaning by K Cleaning Solution"}
          fill
          sizes="(max-width: 1000px) 100vw, (max-width: 1500px) 55vw, 760px"
          priority
        />
      </div>
    );
  }
  if (graphic?.graphic_type === "before_after") {
    graphicComponent = (
      <BeforeAfter
        data={{
          beforeImage: graphic.before_after_image.before,
          afterImage: graphic.before_after_image.after,
        }}
      />
    );
  }
  if (graphic?.graphic_type === "video" && graphic.video?.video?.url) {
    graphicComponent = (
      <video
        className={styles.video}
        controls
        preload="none"
        poster={graphic.video.placeholder_image?.url}
        aria-label="See K Cleaning Solution at work"
      >
        <source src={graphic.video.video.url} />
      </video>
    );
  }
  if (graphic?.graphic_type === "youtube_video" && graphic.youtube_video?.placeholder_image) {
    graphicComponent = (
      <Video
        videoID={graphic.youtube_video.youtube_id}
        placeholderImage={graphic.youtube_video.placeholder_image}
        showCompressedImage
        sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 1000px) 720px, (max-width: 1200px) 50vw, (max-width: 1536px) 52vw, 760px"
        priority
      />
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.contentWrapper}>
            <p className={styles.eyebrow}>{subtitle || "Your local Wellington cleaning team"}</p>
            <HeroTitle title={title} />
            <p className={styles.tagline}>{tagline}</p>
            {description && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
            <ul className={styles.services}>
              {(services.length ? services : defaultServices).map((service) => (
                <li key={service}>
                  <CheckIcon aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <div className={styles.actions}>
              <a className={styles.quoteButton} href="#quote-form">
                Get my free quote <ArrowForwardIcon aria-hidden="true" />
              </a>
              <a className={styles.callLink} href={cleaningPhoneHref}>
                Call {cleaningPhone}
              </a>
            </div>
            {review?.totalScore && (
              <a className={styles.reviewSummary} href={review.url} target="_blank" rel="noopener noreferrer">
                <span className={styles.stars} aria-hidden="true">★★★★★</span>
                <span><strong>{review.totalScore.toFixed(1)}</strong> Google rating</span>
                {review.reviewsCount && <span>{review.reviewsCount}+ customer reviews</span>}
              </a>
            )}
            {graphicComponent && (
              <div className={styles.graphicWrapper}>
                {graphicComponent}
                <p className={styles.imageCaption}>{imageCaption}</p>
              </div>
            )}
          </div>

          <div id="quote-form" className={styles.formWrapper}>
            <div className={styles.formHeader}>
              <h2>Get Your Free Quote</h2>
              <p>Tell us what you need. No obligation whatsoever.</p>
            </div>
            <div className={styles.formBanner}>
              <ScheduleOutlinedIcon aria-hidden="true" />
              <span>A cleaner home. Friendly, local service.</span>
            </div>
            <div className={styles.formBody}>
              <GetQuoteForm hideTitle hideFooter variant="hero" formName={formName} />
              <p className={styles.privacy}>
                <LockOutlinedIcon aria-hidden="true" />
                Your details are private. No spam, ever.
              </p>
              <p className={styles.preferToTalk}>
                Prefer to talk?
                <a href={cleaningPhoneHref}><LocalPhoneIcon aria-hidden="true" />{cleaningPhone}</a>
              </p>
              <ul className={styles.trustBadges}>
                <li><ShieldOutlinedIcon aria-hidden="true" /><span>$2M insured</span></li>
                <li><VerifiedOutlinedIcon aria-hidden="true" /><span>Satisfaction guaranteed</span></li>
                <li><LocationOnOutlinedIcon aria-hidden="true" /><span>Local team</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
