import RowSection from "./Sections/RowSection/RowSection";
import CleaningServices from "./Sections/ServicesSection/CleaningServices";
import FaqAccordionSection from "./Sections/FaqAccordionSection/FaqAccordionSection";
import FormSection from "./Sections/FormSection/FormSection";
import RegularProcess from "./Sections/Process/RegularProcess";
import USP from "../USP/USP";
import Stats from "../Stats/Stats";
import LocationsCovered from "../LocationsCovered/LocationsCovered";
import HoursCalculator from "./Sections/HoursCalculator/HoursCalculator";
import ContactSection from "./Sections/ContactSection/ContactSection";
import SpaceCalculator from "./Sections/SpaceCalculator/SpaceCalculator";
import FooterCta from "../CTA/FooterCta";
import GoogleReviewsCarousel from "../GoogleReviews/GoogleReviewsCarousel";
import UspTable from "./Sections/UspTable/UspTable";
import VerticalTabs from "./Sections/VerticalTabs/VerticalTabs";
import CardsSection from "./Sections/CardsSection/CardsSection";
import OurWorkSection from "./Sections/OurWorkSection/OurWorkSection";
import RowCardTabs from "./Sections/RowCardTabs/RowCardTabs";
import PriceSliderSection from "./Sections/PriceSliderSection/PriceSliderSection";
import EmpathySection from "./Sections/EmpathySection/EmpathySection";
import SolutionSection from "./Sections/SolutionSection/SolutionSection";
import TestimonialSection from "./Sections/TestimonialSection/TestimonialSection";
import ServicePackagesSection from "./Sections/ServicePackagesSection/ServicePackagesSection";
export default function Layout({
  uspTable,
  sections,
  uspData,
  statsData,
  locationsCovered,
  hoursCalculatorData,
  spaceCalculatorData,
  contactInfo,
  socialData,
  servicesData,
  googleReviewsData,
  reviewerPics,
  routeId,
  adsPackagesData,
}) {
  if (!sections) return null;
  console.log(sections);
  const isServicesSection = (section) =>
    ["tabs_section", "services"].includes(section.acf_fc_layout) ||
    (section.acf_fc_layout === "show_services" && section.show_services);
  const servicesSection = sections.find(isServicesSection);
  const reviewsSection = googleReviewsData?.reviews?.length > 0
    ? sections.find((section) => section.acf_fc_layout === "show_reviews")
    : undefined;
  const orderedSections = servicesSection && reviewsSection
    ? sections
      .filter((section) => !isServicesSection(section))
      .flatMap((section) => section === reviewsSection
        ? [section, servicesSection]
        : [section])
    : sections;

  const sectionsJSX = orderedSections.map((section, index) => {
    if (section.acf_fc_layout === "our_work") {
      return (
        <OurWorkSection
          key={index}
          title={section.title}
          description={section.description}
          beforeAfterGalleryArr={section.before_after_gallery}
        />
      );
    }
    if (isServicesSection(section)) {
      return <CleaningServices key={index} />;
    }
    if (section.acf_fc_layout === "row_section_tabs") {
      return (
        <RowCardTabs
          key={index}
          title={section.title}
          description={section.description}
          image={section.image}
          rows={true}
          tabsData={section.tabs}
        />
      );
    }
    if (
      section.acf_fc_layout === "row" ||
      section.acf_fc_layout === "row_layout"
    ) {
      let remappedAccordion;
      if (section.accordion) {
        remappedAccordion = section?.accordion?.map(({ title, value }) => ({
          question: title,
          answer: value,
        }));
      }
      return (
        <RowSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          imageAlignment={section.image_alignment}
          image={section.image}
          ctaGroup={section.cta_group}
          bulletPoints={section.bullet_points}
          accordionData={remappedAccordion}
          showBeforeAfterImages={section.show_before_after_images}
          backgroundColor={section.background_color}
          fontColor={section.font_color}
          beforeImage={
            section.show_before_after_images &&
            section.before_after_images.before_image
          }
          afterImage={
            section.show_before_after_images &&
            section.before_after_images.after_image
          }
        />
      );
    }
    if (section.acf_fc_layout === "cards_section") {
      return (
        <CardsSection
          key={index}
          title={section.section_title}
          description={section.section_description}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "process") {
      return (
        <RegularProcess
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
          image={section.image}
        />
      );
    }
    if (section.acf_fc_layout === "show_reviews" && googleReviewsData) {
      return <GoogleReviewsCarousel key={index} data={googleReviewsData} />;
    }
    // if (section.acf_fc_layout === "tabs_section") {
    //   return    <GradientTabs   key={index}
    //   title={section.section_title}
    //   description={section.section_description}
    //   cards={section.tabs}/>
    // }

    // if (section.acf_fc_layout === "packages") {
    //   return (
    //     <Packages
    //       key={index}
    //       serviceName={section.service_name}
    //       title={section.title}
    //       packagesArray={section.package}
    //       termsAndConditions={section.terms_conditions}
    //     />
    //   );
    // }
    if (section.acf_fc_layout === "local_faq") {
      return (
        <FaqAccordionSection
          key={index}
          title={section.title}
          description={section.description}
          qaData={section.items}
        />
      );
    }

    if (section.acf_fc_layout === "form_section") {
      return (
        <FormSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          usp={{ text_usp: section.text_usp, image_usp: section.image_usp }}
          graphic={section.graphic}
          reviewerPics={reviewerPics}
        />
      );
    }

    if (["form_hero_section", "hero_section"].includes(section.acf_fc_layout)) {
      const graphic = {
        graphic_type: section.graphic_type === "new_graphic_type" ? "image" : section.graphic_type,
        image: section.graphic_type === "new_graphic_type"
          ? section.new_graphic_type?.[0]?.image
          : section.image,
        youtube_video: section.youtube_video_group,
      };
      return (
        <FormSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          usp={section.usp || { text_usp: section.text_usp, image_usp: section.image_usp }}
          graphic={graphic}
        />
      );
    }

    if (section.acf_fc_layout === "show_usp" && section.show_usp) {
      return (
        <VerticalTabs
          key={index}
          title={uspData.section_title}
          description={uspData.section_description}
          cards={uspData.items}
          showTitle={true}
        />
      );
    }
    if (section.acf_fc_layout === "show_stats" && section.show_stats) {
      return <Stats key={index} statsData={statsData} />;
    }
    if (section.acf_fc_layout === "stats_section") {
      return <Stats key={index} statsData={section.stats} />;
    }
    if (section.acf_fc_layout === "show_locations" && section.show_locations) {
      return (
        <LocationsCovered
          key={index}
          title={locationsCovered.title}
          description={locationsCovered.description}
          locations={locationsCovered.locations}
          image={locationsCovered.image}
        />
      );
    }

    if (
      section.acf_fc_layout === "show_hours_calculator" &&
      section.show_hours_calculator
    ) {
      if (!hoursCalculatorData) return null;
      return (
        <HoursCalculator
          key={index}
          title={hoursCalculatorData.title}
          description={hoursCalculatorData.description}
          calculatedValueLabel={hoursCalculatorData.calculated_value_label}
          furnishedLevelData={hoursCalculatorData.furnished_level}
          price={section.price}
        />
      );
    }
    if (
      section.acf_fc_layout === "show_space_calculator" &&
      section.show_space_calculator
    ) {
      if (!spaceCalculatorData) return null;
      return (
        <SpaceCalculator
          key={index}
          title={spaceCalculatorData.title}
          description={spaceCalculatorData.description}
          calculatedValueLabel={spaceCalculatorData.calculated_value_label}
          furnishedLevelData={spaceCalculatorData.furnished_level}
          price={section.price}
        />
      );
    }
    if (section.acf_fc_layout === "contact") {
      return (
        <ContactSection
          key={index}
          title={section.title}
          description={section.description}
          map={section.map}
          uspData={section.usp}
          contactInfo={contactInfo}
          socialData={socialData}
        ></ContactSection>
      );
    }
    if (section.acf_fc_layout === "cta_section") {
      return (
        <FooterCta
          key={index}
          title={section.title}
          description={section.description}
          ctaArray={section.cta}
          image={section.image}
          lightBackground={section.light_background}
        />
      );
    }
    // if (
    //   section.acf_fc_layout === "show_reviews" &&
    //   section.show_reviews &&
    //   googleReviewsData
    // ) {
    //   return <GoogleReviewsCarousel key={index} data={googleReviewsData} />;
    // }

    if (section.acf_fc_layout === "show_usp_table") {
      return <UspTable key={index} uspTableData={uspTable} />;
    }

    if (section.acf_fc_layout === "slider_section") {
      return (
        <PriceSliderSection
          key={index}
          title={section.title}
          description={section.description}
          ctaGroup={section.cta}
          imageAlignment={section.image_alignment}
          image={section.image}
        />
      );
    }

    if (section.acf_fc_layout === "empathy_section") {
      return (
        <EmpathySection
          key={index}
          title={section.title}
          description={section.description}
          ctaArray={section.cta_array}
          items={section.items}
        />
      );
    }

    if (section.acf_fc_layout === "solution_section") {
      return (
        <SolutionSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          ctaArray={section.cta_array}
          items={section.items}
        />
      );
    }

    if (section.acf_fc_layout === "testimonials") {
      return (
        <TestimonialSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          ctaArray={section.cta_array}
          statsArray={section.stats}
          testimonialsArray={section.testimonials}
          clientLogosArray={section.client_logos}
        />
      );
    }
    if (section.acf_fc_layout === "show_ads_package" && section.show) {
      if (!adsPackagesData) return;
      return (
        <ServicePackagesSection
          key={index}
          title={adsPackagesData.title}
          description={adsPackagesData.description}
          packages={adsPackagesData.packages}
        />
      );
    }
  });

  return <section>{sectionsJSX} </section>;
}
