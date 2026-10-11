"use client";

import dynamic from "next/dynamic";

// Keep optional form/calculator dependencies in separate client chunks. SSR
// remains enabled when the CMS actually includes one of these sections.
export const HoursCalculator = dynamic(() => import("./Sections/HoursCalculator/HoursCalculator"));
export const SpaceCalculator = dynamic(() => import("./Sections/SpaceCalculator/SpaceCalculator"));
export const ContactSection = dynamic(() => import("./Sections/ContactSection/ContactSection"));
export const PriceSliderSection = dynamic(() => import("./Sections/PriceSliderSection/PriceSliderSection"));
