import React from "react";
import CustomAccordion from "../../../Accordion/CustomAccordion";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import styles from "./FaqAccordionSection.module.scss";
function FaqAccordionSection({ title, description, qaData }) {
  if (!qaData) return null;
  return (
    <section className={`${styles.section} `} id="faq-section">
      <Container maxWidth="lg">
        <div className={`${styles.gridWrapper} grid gap-40`}>
          <div className={`${styles.titleWrapper}`}>
            <Typography variant="h2" component="h2">
              {title}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              className="description mt-16"
            >
              {description}
            </Typography>
          </div>
          <CustomAccordion qaData={qaData} />
        </div>
      </Container>
    </section>
  );
}

export default FaqAccordionSection;
