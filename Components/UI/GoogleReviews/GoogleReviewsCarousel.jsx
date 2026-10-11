import GoogleReviewsCarouselClient from "./GoogleReviewsCarouselClient";

export default function GoogleReviewsCarousel({ data }) {
  if (!data?.reviews?.length) return null;

  // Send only the visible reviews and the fields the carousel uses to the browser.
  const place = data.reviews[0];
  const reviews = data.reviews
    .filter((review) => review.stars === 5 && typeof review.text === "string" &&
      review.text.length > 79 && typeof review.name === "string" && review.name.length < 20)
    .slice(0, 16)
    .map(({ name, text, stars, reviewerPhotoUrl, publishAt }) =>
      ({ name, text, stars, reviewerPhotoUrl, publishAt }));

  return <GoogleReviewsCarouselClient data={{
    place: { totalScore: place.totalScore, reviewsCount: place.reviewsCount, url: place.url },
    reviews,
  }} />;
}
