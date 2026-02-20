"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ScrollableTabs from "./Tabs/ScrollableTabs";
import styles from "./TabsSection.module.scss";
export default function TabsSection({ title, subtitle, description, cards }) {
  console.log(cards);
  return (
    <section className={`${styles.section}`} id="our-services">
      <Container maxWidth="lg" className={`${styles.container}`}>
        {subtitle && (
          <Typography component="h3" variant="h3" className="subtitle">
            {subtitle}
          </Typography>
        )}

        <div className={`${styles.titleRow} grid`}>
          <Typography
            variant="h3"
            component="h2"
            className="title"
            align="center"
          >
            {title}
          </Typography>
          {description && (
            <div
              className={`${styles.description} heading-6  mt-8 center-align`}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>
        <div className="tabs mt-24">
          <ScrollableTabs tabsData={cards} />
        </div>
      </Container>
    </section>
  );
}
