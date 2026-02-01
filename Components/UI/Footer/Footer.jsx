import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import { contactInfo } from "./FooterContact";

import {
  services,
  usefulLinks,
  commercialLinks,
  informationLinks,
} from "./FooterLinks";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import FooterCta from "../CTA/FooterCta";
import styles from "./Footer.module.scss";
import SocialWrapper from "./SocialWrapper";
export default function Footer({
  footerCtaData,
  showFooterCta = true,
  certifications,

  socialData,
}) {
  console.log(certifications);
  return (
    <>
      {showFooterCta && (
        <FooterCta
          title={footerCtaData?.title}
          description={footerCtaData?.description}
          ctaArray={footerCtaData?.cta}
        />
      )}

      <section className={`${styles.footerSection}`} id="footer">
        <Container maxWidth="xl" className="row">
          {/* logo wrapper */}
          <div className={`${styles.footerWrapper}`}>
            <div className={`${styles.linksContainer}`}>
              <Typography
                variant="subtitle1"
                component="div"
                sx={{ marginBottom: "8px" }}
                color={"var(--light-on-surface)"}
              >
                USEFUL LINKS
              </Typography>
              <ul
                className={`${styles.menuList}`}
                sx={{ margin: 0, padding: 0 }}
              >
                {usefulLinks.map((link, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={link.url}
                        className={`${styles.link}  body2 `}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={`${styles.contactWrapper}`}>
              {contactInfo && contactInfo.info && (
                <div className="contact-section">
                  <ContactInfo contactInfo={contactInfo} />
                </div>
              )}
              {/* {socialData && socialData.length > 0 && (
                <SocialWrapper socialData={socialData} className="mt-24" />
              )} */}
            </div>
          </div>
        </Container>
      </section>
      {/* copyright container */}
      <Copyright />
    </>
  );
}
