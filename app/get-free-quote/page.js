export const revalidate = 2592000; // applies to both page and metadata

import Header from "@/Components/UI/Header/Header";
import {
  getSinglePostData,
  getGoogleReviews,
  getOptions,
} from "@/utils/fetchData";
import Footer from "@/Components/UI/Footer/Footer";
import Layout from "@/Components/UI/Layout/Layout";

import GoogleReviewsCarousel from "@/Components/UI/GoogleReviews/GoogleReviewsCarousel";
import GetQuoteForm from "@/Components/UI/Forms/GetQuoteForm";
import BreadcrumbHero from "@/Components/UI/Hero/BreadcrumbHero";
export async function generateMetadata(props, parent) {
  // optionally access and extend (rather than replace) parent metadata

  return {
    title: "Get Free Quote",
    metadataBase: new URL(process.env.siteUrl),
    openGraph: {
      title: "Get Free Quote",

      siteName: process.env.siteName,

      type: "website",
    },
  };
}

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <BreadcrumbHero title="Get Your Free Quote" />

        {/* <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} /> */}
        <section className="container max-width-sm mt-32 mb-32">
          <GetQuoteForm hideTitle={true} />
        </section>
      </main>
      <Footer />
    </>
  );
}
