import Link from "next/link";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import styles from "./FooterCTA.module.scss";

export default function FooterCta({ title, description, ctaArray, image, lightBackground = false }) {
  if (!title) return null;

  return (
    <section className={`${styles.section} ${lightBackground ? styles.lightBackground : ""}`} aria-label="Get a cleaning quote">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.contentWrapper}>
            {image?.url && (
              <Image className={styles.seal} src={image.url} alt={image.alt || ""} width={140} height={140} />
            )}
            <p className={styles.eyebrow}>Your local Wellington cleaning team</p>
            <h2>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
            {ctaArray?.length > 0 && (
              <div className={styles.actions}>
                {ctaArray.filter((cta) => cta.link?.url).map((cta, index) => (
                  <Link
                    href={cta.link.url}
                    key={cta.link.url}
                    className={`${styles.cta} ${index > 0 ? styles.secondaryCta : ""}`}
                    target={cta.link.target || undefined}
                    rel={cta.link.target === "_blank" ? "noopener noreferrer" : undefined}
                  >
                    {cta.link.title} <ArrowForwardIcon aria-hidden="true" />
                  </Link>
                ))}
              </div>
            )}
            <p className={styles.reassurance}>Free quote. No obligation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
