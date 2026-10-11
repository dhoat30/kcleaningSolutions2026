# Quote conversion tracking

The shared quote form queues `quote_form_submission` after both HubSpot and email delivery confirm success. It provides a unique `transaction_id`, customer matching data, lead details and available campaign attribution. Queuing works before GTM loads. A separate clearing push prevents optional fields from an earlier submission being reused.

The website already loads GTM container `GTM-T54NCV94`. These code changes do not configure or publish tags in that container.

First name, last name and email are required. Phone, property address and message are optional; the message label makes this explicit. The message body is sent with the quote to email/HubSpot but is excluded from the data layer.

## Google Tag Manager setup

1. Create a **Data Layer Variable** named `DLV - Quote User Data`, using version 2, with Data Layer Variable Name `user_data`. This reads the complete matching object. Create a second variable for `transaction_id`.
2. Create a **User-Provided Data** variable named `UPD - Quote Customer`, select **Code**, and select `{{DLV - Quote User Data}}` as its data source. GTM handles normalization and hashing; the website provides unhashed values. Separate variables for every customer field are unnecessary with this method.
3. Configure the Google tag associated with the Google Ads destination. Under its event parameters, set `user_data` to the User-Provided Data variable. Enable its user-provided data capabilities as directed by Google's setup guide.
4. Create a **Custom Event** trigger with event name `quote_form_submission`.
5. Create or update the native **Google Ads Conversion Tracking** tag with the conversion ID and conversion label from the quote conversion action. Set Transaction ID to the `transaction_id` variable and use the custom event trigger. Do not invent a lead value; configure value/currency only if the business has an agreed value.
6. Enable enhanced conversions in Google Ads and review the customer data terms. Use **One** counting for this lead conversion. Replace any existing thank-you-page conversion trigger for the same action so a submission is not counted twice.
7. Connect the site's visitor consent settings to Consent Mode, including `ad_user_data`. The event itself does not grant consent. Do not hard-code consent as granted.
8. In GTM Preview, check a controlled successful test submission: one conversion event, the intended variable values, correct consent state, and one conversion tag firing. Publish after validation. A real test submission sends email, creates a HubSpot lead and can send a conversion; coordinate the test with the business.

If using **Manual configuration** instead of **Code**, create the individual matching variables below and map them to the corresponding fields. Both methods use the same accepted matching schema.

| Google Ads matching field | Data Layer Variable path |
| --- | --- |
| Email | `user_data.email` |
| Phone number | `user_data.phone_number` |
| First name | `user_data.address.first_name` |
| Last name | `user_data.address.last_name` |
| Street address | `user_data.address.street` |
| City | `user_data.address.city` |
| Region | `user_data.address.region` |
| Postal code | `user_data.address.postal_code` |
| Country | `user_data.address.country` |
| Transaction ID (conversion tag) | `transaction_id` |

Name/address matching requires first name, last name, postal code and a two-letter country code. Both name fields are required on the form. If those matching fields are incomplete, `user_data.address` is omitted and email/valid phone remain available. Selecting an autocomplete suggestion supplies the structured address, including `NZ`; a typed address is retained without inventing a postcode or country. The business confirmed the property address is always the customer's address.

The website matching object accepts `email`, `phone_number`, and an `address` object containing `first_name`, `last_name`, `street`, `city`, `region`, `postal_code`, and `country`. A full-name string and a formatted-address string do not substitute for these structured address fields. Transaction IDs, click IDs, UTMs, page/form names, IP addresses and messages are outside this browser user-provided-data schema.

## Additional data

| Data | Available paths | Intended use |
| --- | --- | --- |
| Customer name and original address | `customer_data.first_name`, `customer_data.last_name`, `customer_data.full_name`, `customer_data.address.formatted_address` | Customer records; use the `user_data` paths above for Google Ads matching |
| Structured address | `customer_data.address.street`, `.suburb`, `.city`, `.region`, `.postal_code`, `.country` | Customer records; structured fields exist when a suggestion was selected |
| Form and page | `formName`, `lead_data.page_path` | Identify which form/page generated the lead |
| Submission time / message presence | `lead_data.submitted_at`, `lead_data.has_message` | Lead context; the free-text message body is not placed in the data layer |
| Google click IDs | `attribution.gclid`, `attribution.gbraid`, `attribution.wbraid` | Available attribution/CRM data, particularly useful for later offline conversion imports |
| Campaign data | `attribution.utm_source`, `.utm_medium`, `.utm_campaign`, `.utm_campaign_id`, `.utm_content`, `.utm_term`, `.utm_matchtype`, `.utm_network`, `.utm_device`, `.gads_campaign_id`, `.gads_adgroup_id`, `.gads_ad_id`, `.campaign_name`, `.adgroup_name`, `.ad_name` | Campaign/lead reporting when these parameters were captured |

Existing `formData` variable paths are retained for published tags. New tags should use the paths above. Names, email, phone, addresses and raw form/message text must not be mapped to ordinary GA4 event parameters. Only send permitted matching fields through Google Ads' user-provided data mechanism.

Google click IDs are retained when available and are not hashed or placed inside `user_data`. For browser conversions, configure the Ads-linked Google tag on all pages: it stores and reads ad-click information automatically. Data-layer click IDs alone do not configure Google Ads attribution. If all pages already use the Google tag, Google says a separate Conversion Linker is unnecessary; otherwise follow its Conversion Linker instructions.

No custom IP-address lookup is added. Browser tags already make requests to Google, and IP handling depends on consent. Explicit IP matching is supported in offline Data Manager workflows and Google strongly recommends including IP in its enhanced-conversions-for-leads import checklist; it is not a field in this browser user-provided-data object. Offline imports use their own schema and require conversion date/time and the appropriate conversion action. Google's Data Manager guide lists email/phone, available click IDs, order ID, IP, user agent and session attributes for those imports. Check the specific import method rather than uploading the browser matching object unchanged.

For later qualified/booked-job conversions from HubSpot, Google's GTM leads guide describes a **Google Ads User-Provided Data Event** tag at lead capture plus a separate offline import. The website conversion tag in the steps above measures the successful quote submission. It does not, by itself, import later CRM outcomes.

## Information needed to finish the account setup

- Google Ads conversion ID and conversion label for the quote action.
- Whether this action currently fires through a native Ads tag or an imported GA4 event, and any existing thank-you-page trigger.
- Consent tool/current consent configuration, and who can configure and publish the GTM container.
- Whether later qualified/booked-job conversions should also be imported from HubSpot. That is a separate offline conversion workflow.

## Official references

- [Enhanced conversions using Google Tag Manager](https://support.google.com/google-ads/answer/13262500?hl=en)
- [GTM enhanced conversions for leads, including the whole-object Code method](https://support.google.com/google-ads/answer/11347292?hl=en)
- [Required customer matching fields](https://support.google.com/google-ads/answer/11956168?hl=en)
- [Conversion Linker and Google tag click attribution](https://support.google.com/tagmanager/answer/7549390?hl=en)
- [Consent Mode behavior, including IP and user data](https://support.google.com/tagmanager/answer/13802165?hl=en)
- [Optional offline Data Manager import fields](https://support.google.com/google-ads-data-manager/answer/14184381?hl=en)
- [Enhanced conversions for leads implementation checklist](https://support.google.com/google-ads/answer/16782203?hl=en)
- [Avoid sending personally identifiable information to Analytics](https://support.google.com/analytics/answer/6366371?hl=en)
