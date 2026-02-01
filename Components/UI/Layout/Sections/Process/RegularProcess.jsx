import styles from "./Process.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Image from "next/image";
export default function RegularProcess({ title, description, cards, image }) {
  if (!cards) return null;

  const stepCards = cards.map((item, index) => {
    return (
      <div className={`${styles.stepWrapper} border-radius-12`} key={index}>
        <div className={`${styles.title}`}>
          <div
            className={`${styles.stepTitleNumberWrapper} flex gap-8 align-center justify-center`}
          >
            <Typography
              variant="h4"
              component="div"
              className={`${styles.stepNumber}`}
              color={"var(--dark-on-surface)"}
            >
              0{index + 1}
            </Typography>
          </div>
        </div>
        <div className={`${styles.content} mt-16`}>
          <Typography variant="h6" component="h3" className="bold">
            {item.title}
          </Typography>
          <Typography
            variant="body1"
            component="div"
            className="description body1"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></Typography>
        </div>
      </div>
    );
  });

  return (
    <section className={`${styles.section}`} id="our-process">
      <Container
        maxWidth="md"
        className={`${styles.titleContainer} grid gap-80 align-center`}
      >
        {image && (
          <div
            className={`${styles.imageWrapper} image-wrapper border-radius-16`}
            style={{ paddingBottom: "100%" }}
          >
            <Image
              src={image.sizes.large}
              alt={image.alt || title}
              fill
              className="border-radius-16"
            />
          </div>
        )}
        <div className={`${styles.contentWrapper} `}>
          <div className={`${styles.titleWrapper}`}>
            <div
              dangerouslySetInnerHTML={{ __html: title }}
              className={`heading-1 colored-text  center-align ${styles.titleWrapper}`}
            />

            {description && (
              <Typography variant="body1" component="p">
                {description}
              </Typography>
            )}
          </div>
        </div>
      </Container>

      <Container
        maxWidth="xl"
        className={`${styles.stepsContainer} grid gap-32 space-between mt-56 `}
      >
        {stepCards}
      </Container>
    </section>
  );
}
