import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HeroUSP from "../../../USP/HeroUSP";
import Image from "next/image";
import BeforeAfter from "../../../BeforeAfterSlider/BeforeAfter";
import GetQuoteForm from "@/Components/UI/Forms/GetQuoteForm";
import Video from "@/Components/UI/Video/Video";
import styles from "./FormSection.module.scss";
import GoogleReviewSnippet from "@/Components/UI/GoogleReviews/GoogleReviewCard/GoogleReviewSnippet";
export default function FormSection({
  title,
  description,
  usp,
  graphic,
  reviewerPics,
}) {
  let graphicComponent = null;
  if (graphic.graphic_type === "image" && graphic.image) {
    const paddingBottom = (graphic.image.height / graphic.image.width) * 100;
    graphicComponent = (
      <div
        className="image-wrapper border-radius-12"
        style={{ paddingBottom: `${paddingBottom}%` }}
      >
        <Image
          src={graphic.image.url}
          alt={graphic.image.alt}
          fill
          sizes="(max-width: 1000px) 100vw, 50vw"
          priority
        />
      </div>
    );
  }
  if (graphic.graphic_type === "before_after") {
    graphicComponent = (
      <div className="border-radius-12 overflow-hidden">
        <BeforeAfter
          data={{
            beforeImage: graphic.before_after_image.before,
            afterImage: graphic.before_after_image.after,
          }}
        />
      </div>
    );
  }
  if (graphic.graphic_type === "video") {
    graphicComponent = (
      <Video
        videoHosted={"self"}
        url={graphic.video.video.url}
        placeholderImage={graphic.video.placeholder_image}
        showCompressedImage={true}
      />
    );
  }
  if (graphic.graphic_type === "youtube_video") {
    graphicComponent = (
      <Video
        videoHosted={"youtube"}
        videoID={graphic.youtube_video.youtube_id}
        placeholderImage={graphic.youtube_video.placeholder_image}
        showCompressedImage={true}
      />
    );
  }
  return (
    <section className={`${styles.section}`}>
      <Container maxWidth="lg" className={`${styles.container}`}>
        <div className={`${styles.grid} grid gap-24`}>
          <div className={`${styles.contentWrapper} border-radius-12`}>
            <GoogleReviewSnippet reviewerPics={reviewerPics} />
            <Typography component={"h1"} variant={"h3"} className="title">
              {title}
            </Typography>
            <Typography
              component={"div"}
              variant={"h6"}
              className="description mt-16"
            >
              {description}
            </Typography>
            <HeroUSP data={usp} className="mb-16" twoColumnsGrid={true} />
          </div>
          {graphicComponent && (
            <div className={`${styles.graphicWrapper}`}>{graphicComponent}</div>
          )}
          <Paper
            id="quote-form"
            className={`${styles.formWrapper} border-radius-12`}
            elevation={0}
          >
            <div className={`${styles.formHeader}`}>
              <Typography
                variant="h5"
                component="h2"
                className={`${styles.formTitle} center-align`}
              >
                Get Your Free Quote
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={`${styles.formSubtitle} center-align`}
              >
                Takes less than a minute
              </Typography>
            </div>
            <GetQuoteForm hideTitle={true} />
          </Paper>
        </div>
      </Container>
      <div className={`${styles.mobileCtaBar}`}>
        <Button
          variant="contained"
          href="#quote-form"
          className={`${styles.mobileCtaButton}`}
        >
          Get My Free Quote
        </Button>
        <Button
          variant="outlined"
          href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}
          startIcon={<LocalPhoneIcon />}
          className={`${styles.mobileCallButton}`}
        >
          Call
        </Button>
      </div>
    </section>
  );
}
