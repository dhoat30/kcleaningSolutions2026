import Link from "next/link";
import Image from "next/image";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { usefulLinks } from "./FooterLinks";
import { cleaningPhone, cleaningPhoneHref, cleaningEmail } from "@/utils/cleaningContact";
import Copyright from "./Copyright";
import FooterCta from "../CTA/FooterCta";
import styles from "./Footer.module.scss";

export default function Footer({ footerCtaData, showFooterCta = true }) {
  return (
    <>
      {showFooterCta && (
        <FooterCta
          title={footerCtaData?.title}
          description={footerCtaData?.description}
          ctaArray={footerCtaData?.cta}
        />
      )}
      <footer className={styles.footerSection} id="footer">
        <div className={styles.container}>
          <div className={styles.footerWrapper}>
            <div className={styles.brand}>
              <Link href="/" className={styles.logo} aria-label="K Cleaning Solution home">
                <Image src="/logo.png" alt="K Cleaning Solution" width={144} height={108} />
              </Link>
              <p className={styles.tagline}>A cleaner home.<br />More time for you.</p>
              <p className={styles.brandDescription}>
                Friendly, local cleaning for homes across Wellington and surrounding areas.
              </p>
            </div>
            <nav className={styles.navigation} aria-label="Footer navigation">
              <h2 className={styles.heading}>Explore</h2>
              <ul className={styles.menuList}>
                {usefulLinks.map((link) => (
                  <li key={link.url}>
                    <Link href={link.url} className={styles.link}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.contactWrapper}>
              <h2 className={styles.heading}>Let’s make your home shine</h2>
              <a href={cleaningPhoneHref} className={styles.contactLink}>
                <span className={styles.contactIcon}><LocalPhoneOutlinedIcon aria-hidden="true" /></span>
                <span><span className={styles.contactLabel}>Call our team</span>{cleaningPhone}</span>
              </a>
              <a href={`mailto:${cleaningEmail}`} className={styles.contactLink}>
                <span className={styles.contactIcon}><MailOutlineIcon aria-hidden="true" /></span>
                <span><span className={styles.contactLabel}>Email us</span>{cleaningEmail}</span>
              </a>
              <p className={styles.serviceArea}>
                <PlaceOutlinedIcon aria-hidden="true" /> Wellington &amp; surrounding areas
              </p>
              <Link href="/get-free-quote" className={styles.quoteButton}>
                Get your free quote <ArrowForwardIcon aria-hidden="true" />
              </Link>
            </div>
          </div>
          <Copyright />
        </div>
      </footer>
    </>
  );
}
