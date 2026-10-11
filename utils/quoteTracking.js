export function normalizeConversionPhone(value = "") {
  let phone = value.trim().replace(/[\s().-]/g, "");

  if (phone.startsWith("00")) phone = `+${phone.slice(2)}`;
  else if (phone.startsWith("0")) phone = `+64${phone.slice(1)}`;
  else if (phone.startsWith("64")) phone = `+${phone}`;

  return /^\+[1-9]\d{9,14}$/.test(phone) ? phone : undefined;
}

export function isQuoteSubmissionSuccessful(responses) {
  return responses.length === 2 && responses.every((response) =>
    response.status >= 200 && response.status < 300 && response.data?.success === true);
}

const attributionFields = [
  "gclid", "gbraid", "wbraid",
  "utm_source", "utm_medium", "utm_campaign", "utm_campaign_id", "utm_content", "utm_term",
  "utm_matchtype", "utm_network", "utm_device",
  "gads_campaign_id", "gads_adgroup_id", "gads_ad_id", "campaign_name", "adgroup_name", "ad_name",
];

export function trackQuoteSubmission({ formData, formName, address = {}, clickIds = {}, transactionId }, target = typeof window !== "undefined" ? window : undefined) {
  if (!target) return;

  const email = formData.email.trim().toLowerCase();
  const phone = normalizeConversionPhone(formData.phone);
  const firstName = (formData.firstname || "").trim();
  const lastName = (formData.lastname || "").trim();
  const customerAddress = {
    formatted_address: (formData.address || "").trim(),
    street: [address.streetNumber, address.streetName].filter(Boolean).join(" ").trim(),
    suburb: address.suburb || "",
    city: address.city || "",
    region: address.region || "",
    postal_code: address.postalCode || "",
    country: (address.country || "").trim().toUpperCase(),
  };
  const id = transactionId || target.crypto?.randomUUID?.() || `quote-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const userData = { email, ...(phone && { phone_number: phone }) };

  // Google requires all four fields for name/address matching. Email and phone
  // remain available when the structured address is incomplete.
  if (firstName && lastName && customerAddress.postal_code && /^[A-Z]{2}$/.test(customerAddress.country)) {
    userData.address = Object.fromEntries(Object.entries({
      first_name: firstName,
      last_name: lastName,
      street: customerAddress.street,
      city: customerAddress.city,
      region: customerAddress.region,
      postal_code: customerAddress.postal_code,
      country: customerAddress.country,
    }).filter(([, value]) => value));
  }

  const attribution = Object.fromEntries(attributionFields
    .filter((key) => typeof clickIds[key] === "string" && clickIds[key])
    .map((key) => [key, clickIds[key]]));

  target.dataLayer = target.dataLayer || [];
  // Replace the previous visitor's/submission's matching data, including optional fields.
  target.dataLayer.push({ user_data: null, customer_data: null, lead_data: null, attribution: null, formData: null });
  target.dataLayer.push({
    event: "quote_form_submission",
    formName,
    transaction_id: id,
    user_data: userData,
    customer_data: {
      first_name: firstName,
      last_name: lastName,
      full_name: [firstName, lastName].filter(Boolean).join(" "),
      address: customerAddress,
    },
    lead_data: {
      page_path: target.location?.pathname || "",
      submitted_at: new Date().toISOString(),
      has_message: Boolean(formData.message?.trim()),
    },
    attribution,
    // Retain the existing variable paths so published GTM tags keep working.
    formData: {
      firstName,
      lastName,
      fullName: [firstName, lastName].filter(Boolean).join(" "),
      email: formData.email,
      phone: formData.phone || "",
      propertyAddress: customerAddress.formatted_address,
      street: customerAddress.street,
      city: customerAddress.city,
      region: customerAddress.region,
      postCode: customerAddress.postal_code,
      country: customerAddress.country,
      gclid: clickIds.gclid || "",
      gbraid: clickIds.gbraid || "",
      wbraid: clickIds.wbraid || "",
      fbclid: clickIds.fbclid || "",
      fbc: clickIds.fbc || "",
      fbp: clickIds.fbp || "",
    },
  });

  return id;
}
