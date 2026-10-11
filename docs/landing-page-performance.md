# Landing page performance

## Starting report

[Mobile PageSpeed report, 11 October 2026](https://pagespeed.web.dev/analysis/https-quote-kcleaningsolution-co-nz/q7c8347xrg?form_factor=mobile)

- Performance: 46; FCP: 4.2 s; LCP: 6.4 s; TBT: 750 ms; CLS: 0.
- The LCP element is the hero description (`FormSection_description`), a text block.
- The LCP breakdown identifies element render delay. Its diagnostic timings are from the recorded trace and should not be added to the throttled 6.4 s metric.
- Maps transferred about 396 KiB in total, even before anyone used the address field.
- The third-party table attributes 465 ms of main-thread time to Google Tag Manager/Google tag, 253 ms to Meta and 208 ms to Maps.
- The cache-lifetime warning mainly concerns vendor-controlled responses. Changing first-party cache headers will not fix Google's or Meta's cache headers.

## Changes

- Keep the complete hero and form server-rendered.
- Request Places when someone focuses the quote form, with an address-field fallback for direct entry. Typing a manual address remains possible.
- Use only text-field controls in the quote form. Split the generic date picker and optional CMS calculator/contact sections into separate client chunks.
- Filter the carousel's 16 reviews on the server and send only the displayed fields and business rating. Keep all original review data in the source JSON.
- Pass only URL, alt text and dimensions for gallery images to the browser.
- Activate carousel animation near the viewport and stop it offscreen.
- Remove preloads for the lower gallery. Keep hero image priority and use responsive sizes for hero and gallery images.

## Production build comparison

These are local build measurements, not a new live Lighthouse score. Next.js first-load figures exclude third-party tracking and Maps.

| Route | First-load JavaScript before | After |
| --- | ---: | ---: |
| Home | 338 kB | 255 kB |
| Move-in cleaning | 338 kB | 255 kB |
| Move-out cleaning | 338 kB | 255 kB |
| End-of-tenancy cleaning | 339 kB | 256 kB |
| Carpet shampoo | 315 kB | 237 kB |
| Free quote | 299 kB | 221 kB |

The homepage's generated HTML, including embedded React component data, decreased from 556,237 bytes to approximately 375,500 bytes. Gzip size decreased from 54,064 bytes to approximately 37,800 bytes. Maps is absent from the initial page's scripts until form interaction.

## GTM review

The application loads the container after page load. Meta, ClickCease and call-tracking scripts are configured externally; these changes do not remove or delay the container further.

1. In GTM Preview, inspect which tags fire on Container Loaded, DOM Ready and Window Loaded. Confirm each platform's base tag runs once per intended page view.
2. Review the Google tag's destinations. The report shows both `AW-16855027329` and `AW-17392670524`, plus `G-TYDJBQRTKT`. Multiple destinations may be intentional; verify ownership and purpose before removing any.
3. Check Meta's tag and automatic event configuration. Retain the events actually used by campaigns and avoid loading an additional pixel through another installation.
4. Review whether ClickCease and call tracking are needed on every route. Preserve their intended attribution and fraud-protection coverage when adjusting triggers.
5. Keep the quote conversion on `quote_form_submission`, with its transaction ID and user-provided data. Do not add a second conversion tag for the same submission just to improve performance.
6. Retest mobile PageSpeed after deploying these changes. Compare FCP, LCP, TBT and the LCP element across multiple runs; the saved report describes the earlier deployment.

Browser verification does not submit leads or generate test conversion events. Maps suggestions can be tested on the authorized localhost development origin; the separate production preview port is rejected by the existing Maps key's referrer restrictions.

References: [Google's LCP optimization guide](https://web.dev/articles/optimize-lcp), [Next.js lazy loading](https://nextjs.org/docs/app/guides/lazy-loading), [Maps JavaScript loading](https://developers.google.com/maps/documentation/javascript/load-maps-js-api).
