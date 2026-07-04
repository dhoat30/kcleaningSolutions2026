"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Stats.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// animates "1200+", "99%", "$2M" style values while keeping prefix/suffix intact
function StatItem({ value, title, started }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!started || typeof value !== "string") return;
    const match = value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, rawNumber, suffix] = match;
    const target = parseFloat(rawNumber.replace(/,/g, ""));
    const decimals = (rawNumber.split(".")[1] || "").length;
    const hasComma = rawNumber.includes(",");
    const duration = 1400;

    let frame;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted = hasComma
        ? current.toLocaleString("en-NZ", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : current.toFixed(decimals);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return (
    <div className={`${styles.statWrapper} center-align grid`}>
      <Typography className={`${styles.value}`} variant="h2" component="span">
        {display}
      </Typography>
      <Typography
        className={`${styles.label} mt-8`}
        variant="h6"
        component="span"
      >
        {title}
      </Typography>
    </div>
  );
}

export default function Stats({ statsData }) {
  const sectionRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = statsData?.map((item, index) => {
    return (
      <StatItem
        key={index}
        value={item.value}
        title={item.title}
        started={started}
      />
    );
  });
  return (
    <section className={`${styles.section}`} ref={sectionRef}>
      <Container
        maxWidth="lg"
        className={`${styles.container} flex gap-16 flex-wrap space-between `}
      >
        {stats}
      </Container>
    </section>
  );
}
