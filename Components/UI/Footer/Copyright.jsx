import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";
import styles from "./Footer.module.scss";
export default function Copyright() {
  return (
    <div className={`${styles.copyrightWrapper} `}>
      <Container maxWidth="xl" className="content-wrapper pt-8 pb-8">
        <div className="copyright-wrapper flex justify-center">
          <a href="https://webduel.co.nz" rel="nofollow" target="_blank">
            <Typography
              variant="body1"
              component="span"
              className="center-align"
            >
              Designed & Developed by web<strong>duel</strong>
            </Typography>
          </a>
        </div>
      </Container>
    </div>
  );
}
