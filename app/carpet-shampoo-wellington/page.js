import Image from "next/image";
import CheckIcon from "@mui/icons-material/Check";
import Header from "@/Components/UI/Header/Header";
import Footer from "@/Components/UI/Footer/Footer";
import FormSection from "@/Components/UI/Layout/Sections/FormSection/FormSection";
import GoogleReviewsCarousel from "@/Components/UI/GoogleReviews/GoogleReviewsCarousel";
import CleaningServices from "@/Components/UI/Layout/Sections/ServicesSection/CleaningServices";
import RegularProcess from "@/Components/UI/Layout/Sections/Process/RegularProcess";
import FaqAccordionSection from "@/Components/UI/Layout/Sections/FaqAccordionSection/FaqAccordionSection";
import reviewsData from "@/data/google-reviews.json";
import { cleaningPhone, cleaningPhoneHref } from "@/utils/cleaningContact";
import styles from "./page.module.scss";

const cleaningPhoto = "https://data.webduel.co.nz/wp-content/uploads/2025/03/2024-11-19-2-e1741752911261.jpg";
const roomPhoto = "https://data.webduel.co.nz/wp-content/uploads/2025/03/2025-02-05-1.jpg";
const title = "Carpet Shampoo Wellington | K Cleaning Solution";
const description = "Refresh your carpets with professional carpet shampooing in Wellington. Cleaning for bedrooms, living areas and end-of-tenancy needs. Get a free quote.";

export const metadata = {
  title,
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kcleaningsolution.co.nz"),
  alternates: { canonical: "/carpet-shampoo-wellington" },
  openGraph: {
    title,
    description,
    url: "/carpet-shampoo-wellington",
    siteName: "K Cleaning Solution",
    type: "website",
    images: [{ url: cleaningPhoto, width: 765, height: 532, alt: "K Cleaning Solution cleaning a carpet" }],
  },
};

const inclusions = [
  { title: "Bedrooms & living areas", description: "Refresh the carpeted rooms you use every day, from a single room to multiple areas of your home." },
  { title: "Hallways & high-traffic areas", description: "Give extra attention to the areas that collect the most everyday dirt. Include carpeted stairs when requesting your quote." },
  { title: "Spots & spills", description: "Tell us about any stains, spills or previous treatments so we can assess them and discuss suitable cleaning options." },
  { title: "Moving & tenancy cleaning", description: "Book carpet shampooing on its own or combine it with your move-in, move-out or end-of-tenancy clean." },
];

const steps = [
  { title: "Tell us about your carpets", description: "Share your address and the rooms you’d like cleaned. Let us know about stairs, stains and your preferred date." },
  { title: "Agree on your clean", description: "We’ll confirm the areas, access and price with you before the work begins, and arrange a time that suits." },
  { title: "Enjoy your refreshed space", description: "Our team cleans the agreed areas and explains drying and aftercare so you know when your carpets are ready to use." },
];

const faqs = [
  { question: "How much does carpet shampooing cost?", answer: "<p>Your quote depends on the number and size of the areas, carpet condition, stairs and access. Tell us what needs cleaning and we’ll confirm the price before the work begins.</p>" },
  { question: "Can I book carpet shampooing without a house clean?", answer: "<p>Yes. Book it as a standalone service or ask us to include it with a house clean, move-in clean or end-of-tenancy clean.</p>" },
  { question: "Can you remove every stain?", answer: "<p>Some marks respond better than others, depending on what caused them, the carpet fibre and how long they have been there. Let us know about any problem areas so we can assess them and explain what to expect.</p>" },
  { question: "How long will my carpets take to dry?", answer: "<p>Drying time varies with the carpet, ventilation and conditions in your home. Our team will give you guidance for your carpets after cleaning. Allow time for drying before putting furniture back or returning to normal use.</p>" },
  { question: "What should I do before the team arrives?", answer: "<p>Remove small items and belongings from the areas being cleaned, and arrange access to the property. Discuss any heavy furniture with us beforehand so we can agree on which areas are accessible.</p>" },
  { question: "Do you offer carpet shampooing in my area?", answer: "<p>We serve Wellington and surrounding areas. Add your property address to your enquiry or call our team to confirm availability and arrange your quote.</p>" },
];

export default function CarpetShampooPage() {
  return (
    <>
      <Header />
      <main>
        <FormSection
          title="Carpet shampoo services in Wellington."
          subtitle="Your local carpet cleaning team"
          tagline="Fresh carpets. A home that feels clean."
          description="<p>Give well-used carpets a fresh start with professional carpet shampooing. From bedrooms and living rooms to a move-out refresh, K Cleaning Solution takes care of the areas you need cleaned.</p><p>Serving Wellington and surrounding areas.</p>"
          usp={{ text_usp: ["Carpet shampooing", "Bedrooms & living rooms", "High-traffic areas", "Spot & stain assessment", "Move-out carpet cleans", "Free, no-obligation quote"].map((value) => ({ value })) }}
          graphic={{ graphic_type: "image", image: { url: cleaningPhoto, alt: "K Cleaning Solution team using extraction equipment to clean a carpet" } }}
          imageCaption="Professional care for the carpets you come home to."
          formName="Carpet Shampoo Quote"
        />

        <section className={styles.details} aria-labelledby="carpet-cleaning-heading">
          <div className={styles.container}>
            <div className={styles.detailsGrid}>
              <div>
                <p className={styles.eyebrow}>A refresh from the floor up</p>
                <h2 id="carpet-cleaning-heading">Care for every carpeted corner.</h2>
                <p className={styles.introduction}>Every home is different. Choose the areas you’d like us to clean and we’ll agree on the work before we start.</p>
                <ul className={styles.inclusions}>
                  {inclusions.map((item) => (
                    <li key={item.title}>
                      <span className={styles.check}><CheckIcon aria-hidden="true" /></span>
                      <div><h3>{item.title}</h3><p>{item.description}</p></div>
                    </li>
                  ))}
                </ul>
              </div>
              <figure className={styles.photo}>
                <Image src={roomPhoto} alt="Carpeted Wellington living room from K Cleaning Solution’s work gallery" width={1360} height={1020} sizes="(max-width: 1000px) 100vw, 45vw" />
                <figcaption>A little care for the spaces you use every day.</figcaption>
              </figure>
            </div>
            <aside className={styles.quoteNote} aria-label="Information for your carpet cleaning quote">
              <div>
                <h3>Help us quote your carpet clean.</h3>
                <p>In the optional message, include the rooms, any stairs or stains, and your preferred date. We’ll take it from there.</p>
              </div>
              <a href="#quote-form">Get my free quote <span aria-hidden="true">↗</span></a>
            </aside>
          </div>
        </section>

        <GoogleReviewsCarousel data={reviewsData} />
        <CleaningServices />
        <RegularProcess title="<h2>Your carpet clean in three simple steps.</h2>" description="A straightforward booking, with the details agreed before we arrive." cards={steps} ctaHref="#quote-form" />
        <FaqAccordionSection title="Carpet shampooing questions, answered." description="A few things to know before your clean." qaData={faqs} />
      </main>
      <Footer footerCtaData={{
        title: "Ready to refresh your carpets?",
        description: "Tell us what needs cleaning. Our local team will help you arrange a carpet clean that fits your home.",
        cta: [
          { link: { url: "#quote-form", title: "Get my free quote" } },
          { link: { url: cleaningPhoneHref, title: `Call ${cleaningPhone}` } },
        ],
      }} />
    </>
  );
}
