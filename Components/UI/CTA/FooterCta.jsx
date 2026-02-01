import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import React from "react";
import styles from "./FooterCTA.module.scss";
import Image from 'next/image'
export default function FooterCta({ title, description, ctaArray, image, lightBackground = false  }) {
  if(!title) return 
  return (

  <section className={`${styles.section}`} style={{backgroundColor: `${lightBackground ? "var(--light-surface-container-lowest)" : null}`}}>
      <Container maxWidth="lg">
        <div className={ `${styles.wrapper}`}>
          <div className={ `${styles.contentWrapper}`}>
            {image && (   <div className={`${styles.sealWrapper} flex justify-center mb-24`}>
              <Image src={image.url} alt={image.alt} width="180" height="180"/> 
            </div>)}
         
            <Typography
              component="h2"
              variant="h2"
              sx={{  lineHeight: 1.2 }}
              align="center"
              color="white"
              className="title"
            >
              {title}
              
            </Typography>
            <Typography
              component="div"
              variant="h5"
              align="center"
              color="white"
                            sx={{ fontWeight: 500 }}

              className="description mt-16 "
            >
              {description}              
            </Typography>
            {/* <Typography
              component="p"
              variant="body1"
              align="center"
              color="white"
              className="description mt-16"
            >
            
            </Typography> */}
            <div className="button-wrapper flex justify-center mt-24 gap-16 flex-wrap">
              {ctaArray && ctaArray.map((cta, index) => { 
                return       <Link href={cta.link.url} key={index}>
                <Button
                  size="large"
                  variant="contained"
                  sx={{
                    background: "white",
                    color: "var(--dark-on-primary)",
                    "&:hover": {
                      background: "#eaeaea",
                    },
                  }}
                >
                  {cta.link.title}
                </Button>
              </Link>
              } )  
              }

              {/* <Link href="/get-free-quote">
              <Button
                size="large"
                variant="outlined"
                sx={{
                  border: "1px solid white",
                  color: "white",
                  "&:hover": {
                    border: "1px solid #eaeaea",
                  },
                }}
              >
                {cta.label}
              </Button>
            </Link> */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

