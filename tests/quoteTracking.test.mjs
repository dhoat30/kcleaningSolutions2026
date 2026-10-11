import test from "node:test";
import assert from "node:assert/strict";
import { isQuoteSubmissionSuccessful, normalizeConversionPhone, trackQuoteSubmission } from "../utils/quoteTracking.js";

test("formats NZ and international phone numbers and excludes unusable values", () => {
  assert.equal(normalizeConversionPhone("021 280 5003"), "+64212805003");
  assert.equal(normalizeConversionPhone("(04) 555-0123"), "+6445550123");
  assert.equal(normalizeConversionPhone("64 21 280 5003"), "+64212805003");
  assert.equal(normalizeConversionPhone("0064 21 280 5003"), "+64212805003");
  assert.equal(normalizeConversionPhone("+1 (650) 555-0123"), "+16505550123");
  assert.equal(normalizeConversionPhone(""), undefined);
  assert.equal(normalizeConversionPhone("123"), undefined);
  assert.equal(normalizeConversionPhone("021 280 5003 ext 9"), undefined);
});

test("only accepts conversions when both form destinations confirm success", () => {
  const success = { status: 200, data: { success: true } };
  assert.equal(isQuoteSubmissionSuccessful([success, success]), true);
  assert.equal(isQuoteSubmissionSuccessful([success, { status: 200, data: { success: false } }]), false);
  assert.equal(isQuoteSubmissionSuccessful([{ status: 400, data: { success: true } }, success]), false);
  assert.equal(isQuoteSubmissionSuccessful([{ status: 200, data: {} }, success]), false);
  assert.equal(isQuoteSubmissionSuccessful([]), false);
});

test("queues the conversion before GTM loads, with matching data and a transaction ID", () => {
  const target = { crypto: { randomUUID: () => "test-quote-1" } };
  trackQuoteSubmission({
    formData: { firstname: "Customer", email: " Customer@Example.com ", phone: "021 280 5003", message: "Not for analytics" },
    formName: "Home cleaning quote",
  }, target);
  const event = target.dataLayer.find((item) => item.event);
  assert.equal(event.event, "quote_form_submission");
  assert.equal(event.formName, "Home cleaning quote");
  assert.equal(event.transaction_id, "test-quote-1");
  assert.deepEqual(event.user_data, { email: "customer@example.com", phone_number: "+64212805003" });
  assert.equal(event.formData.email, " Customer@Example.com ");
  assert.equal(event.formData.phone, "021 280 5003");
  assert.equal(JSON.stringify(target.dataLayer).includes("Not for analytics"), false);
});

test("clears optional matching data from previous submissions", () => {
  const target = { dataLayer: [] };
  trackQuoteSubmission({
    formData: { firstname: "Previous", lastname: "Customer", email: "previous@example.com", phone: "021 280 5003" },
    address: { postalCode: "6011", country: "NZ" },
    clickIds: { gclid: "previous-click" },
    transactionId: "test-quote-previous",
  }, target);
  trackQuoteSubmission({
    formData: { firstname: "Test", email: "test@example.com", phone: "" },
    formName: "Cleaning quote",
    transactionId: "test-quote-2",
  }, target);
  assert.deepEqual(target.dataLayer[2], { user_data: null, customer_data: null, lead_data: null, attribution: null, formData: null });
  assert.deepEqual(target.dataLayer[3].user_data, { email: "test@example.com" });
  assert.equal(target.dataLayer[3].formData.phone, "");
  assert.equal(target.dataLayer[3].customer_data.last_name, "");
  assert.deepEqual(target.dataLayer[3].attribution, {});
});

test("includes complete name/address matching without splitting multiword given names", () => {
  const target = {};
  trackQuoteSubmission({
    formData: { firstname: " Mary Ann ", lastname: " Smith ", email: "customer@example.com", address: "55 Cable Street, Wellington 6011, New Zealand" },
    address: { streetNumber: "55", streetName: "Cable Street", suburb: "Te Aro", city: "Wellington", region: "Wellington", postalCode: "6011", country: "nz" },
    transactionId: "test-quote-address",
  }, target);
  const event = target.dataLayer[1];
  assert.deepEqual(event.user_data.address, {
    first_name: "Mary Ann", last_name: "Smith", street: "55 Cable Street",
    city: "Wellington", region: "Wellington", postal_code: "6011", country: "NZ",
  });
  assert.equal(event.customer_data.full_name, "Mary Ann Smith");
  assert.equal(event.customer_data.address.suburb, "Te Aro");
  assert.equal(event.formData.firstName, "Mary Ann");
  assert.equal(event.formData.lastName, "Smith");
  assert.equal(event.formData.country, "NZ");
});

test("keeps email matching and the original customer address when address matching is incomplete", () => {
  const completeForm = { firstname: "Mary Ann", lastname: "Smith", email: "customer@example.com", address: "Typed customer address" };
  const completeAddress = { postalCode: "6011", country: "NZ" };
  const cases = [
    { formData: { ...completeForm, firstname: "" }, address: completeAddress },
    { formData: { ...completeForm, lastname: "" }, address: completeAddress },
    { formData: completeForm, address: { ...completeAddress, postalCode: "" } },
    { formData: completeForm, address: { ...completeAddress, country: "" } },
    { formData: completeForm, address: { ...completeAddress, country: "New Zealand" } },
    { formData: completeForm },
  ];
  for (const submission of cases) {
    const target = {};
    trackQuoteSubmission({ ...submission, transactionId: "test-quote-incomplete" }, target);
    const event = target.dataLayer[1];
    assert.deepEqual(event.user_data, { email: "customer@example.com" });
    assert.equal(event.customer_data.address.formatted_address, "Typed customer address");
    assert.equal(event.customer_data.first_name, submission.formData.firstname);
  }
  const target = {};
  trackQuoteSubmission({ formData: completeForm }, target);
  assert.equal(target.dataLayer[1].customer_data.address.street, "");
  assert.equal(target.dataLayer[1].customer_data.address.postal_code, "");
  assert.equal(target.dataLayer[1].customer_data.address.country, "");
});

test("includes useful lead context and known attribution fields without message text or arbitrary URL data", () => {
  const target = { location: { pathname: "/get-free-quote", search: "?email=private@example.com" } };
  trackQuoteSubmission({
    formData: { firstname: "Customer", lastname: "Example", email: "customer@example.com", message: "Private cleaning instructions" },
    formName: "Quote form",
    clickIds: {
      gclid: "google-click", gbraid: "google-app-click", wbraid: "google-web-click",
      utm_source: "google", utm_campaign: "wellington-cleaning", gads_campaign_id: "123",
      email: "private@example.com", ip_address: "192.0.2.1", unexpected: "private", utm_medium: "",
    },
    transactionId: "test-quote-context",
  }, target);
  const event = target.dataLayer[1];
  assert.equal(event.lead_data.page_path, "/get-free-quote");
  assert.equal(Number.isNaN(Date.parse(event.lead_data.submitted_at)), false);
  assert.equal(event.lead_data.has_message, true);
  assert.deepEqual(event.attribution, {
    gclid: "google-click", gbraid: "google-app-click", wbraid: "google-web-click",
    utm_source: "google", utm_campaign: "wellington-cleaning", gads_campaign_id: "123",
  });
  assert.equal(JSON.stringify(event).includes("Private cleaning instructions"), false);
  assert.equal(JSON.stringify(event).includes("private@example.com"), false);
  assert.equal(JSON.stringify(event).includes("192.0.2.1"), false);
});
