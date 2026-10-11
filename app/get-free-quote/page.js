export const revalidate = 2592000; // applies to both page and metadata

import Header from "@/Components/UI/Header/Header";
import { getSinglePostData } from "@/utils/fetchData";
import Footer from "@/Components/UI/Footer/Footer";
import FormSection from "@/Components/UI/Layout/Sections/FormSection/FormSection";
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
  const data = await getSinglePostData(
    "k-cleaning-solution",
    "/wp-json/wp/v2/cleaning-business",
  );
  const hero = data?.[0]?.acf?.layout?.[0];
  return (
    <>
      <Header />
      <main>
        <FormSection
          title="Get Your <strong>Free Quote</strong>"
          description="Tell us about your property and the cleaning you need. Our local Wellington team will help you find the right service for your home or business."
          usp={{ text_usp: hero?.text_usp }}
          graphic={hero?.graphic}
        />
      </main>
      <Footer showFooterCta={false} />
    </>
  );
}
