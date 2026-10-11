"use client";

import React, { useState, useRef } from "react";
import Input from "./InputFields/Input";
import { getQuoteFormData } from "@/utils/getQuoteFormData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import GoogleAutocomplete from "@/Components/GoogleMaps/GoogleAutoComplete";
import styles from "./FormStyle.module.scss";
import { useClickIds } from "@/hooks/useClickIds";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { cleaningPhone, cleaningPhoneHref } from "@/utils/cleaningContact";
import { isQuoteSubmissionSuccessful, trackQuoteSubmission } from "@/utils/quoteTracking";

export default function GetQuoteForm({
  className,
  formName = "Get a Quote Form",
  title = "Get Your Free Quote",
  hideTitle = false,
  hideFooter = false,
  variant = "default",
}) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: "", // Default empty string to make it controlled
    lastname: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [newSubmission, setNewSubmission] = useState(false);
  const submissionInFlight = useRef(false);
  const [googleAdsAddress, setGoogleAdsAddress] = useState({
    pickUpAddress: {},
    dropOffAddress: {},
  }); // For Google Ads conversion tracking
  // click id
  const { clickIds } = useClickIds();
  const handleChange = (id, value) => {
    let newValue = value.target ? value.target.value : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));

    // Reset errors on change
    if (errors[id]) {
      setErrors({ ...errors, [id]: false });
    }
  };

  const handleBlur = (id, validationFunction) => {
    if (!validationFunction(formData[id])) {
      setErrors({ ...errors, [id]: true });
    }
  };

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission if using form tag
    if (submissionInFlight.current) return;

    let allFieldsValid = true;
    const newErrors = {};

    // Loop through each field to check if it's required and valid
    getQuoteFormData.forEach((field) => {
      if (field.required) {
        if (field.type === "chip") {
          if (!formData[field.id] || formData[field.id].length === 0) {
            newErrors[field.id] = true;
            allFieldsValid = false;
          }
        } else if (
          !formData[field.id] ||
          !field.validation(formData[field.id])
        ) {
          newErrors[field.id] = true;
          allFieldsValid = false;
        }
      }
    });

    setErrors(newErrors);
    // If any required field is invalid, stop and don't make API calls
    if (!allFieldsValid) {
      return; // Stop the function if any field is invalid o  r empty
    }

    const dataPayload = {
      email: formData.email,
      formName: formName,
      message: [
        `First Name: ${formData.firstname}`,
        `Last Name: ${formData.lastname}`,
        `Email: ${formData.email}`,
        `Phone Number: ${formData.phone}`,
        `Property Address: ${formData.address}`,
        `Message: ${formData.message}`,
      ].join("\n"),
      hubspotFormID: process.env.NEXT_PUBLIC_HUBSPOT_GET_QUOTE_FORM,
      hubspotFormObject: [
        { name: "hs_google_click_id", value: clickIds.gclid || "" },
        { name: "gbraid", value: clickIds.gbraid || "" },
        { name: "wbraid", value: clickIds.wbraid || "" },
        { name: "gads_campaign_id", value: clickIds.gads_campaign_id || "" },
        { name: "gads_adgroup_id", value: clickIds.gads_adgroup_id || "" },
        { name: "gads_ad_id", value: clickIds.gads_ad_id || "" },
        { name: "campaign_name", value: clickIds.campaign_name || "" },
        { name: "adgroup_name", value: clickIds.adgroup_name || "" },
        { name: "ad_name", value: clickIds.ad_name || "" },
        { name: "utm_term", value: clickIds.utm_term || "" },
        { name: "utm_matchtype", value: clickIds.utm_matchtype || "" },
        { name: "utm_network", value: clickIds.utm_network || "" },
        { name: "utm_device", value: clickIds.utm_device || "" },
        { name: "utm_content", value: clickIds.utm_content || "" },
        { name: "utm_source", value: clickIds.utm_source || "" },
        { name: "hs_facebook_click_id", value: clickIds.fbclid || "" },
        { name: "fbp", value: clickIds.fbp || "" },
        { name: "fbc", value: clickIds.fbc || "" },
        { name: "fb_campaign_id", value: clickIds.fb_campaign_id || "" },
        { name: "fb_platform", value: clickIds.fb_platform || "" },
        { name: "fb_ad_id", value: clickIds.fb_ad_id || "" },
        { name: "fb_adset_id", value: clickIds.fb_adset_id || "" },
        { name: "fb_site_source", value: clickIds.fb_site_source || "" },

        { name: "firstname", value: formData.firstname },
        { name: "lastname", value: formData.lastname },
        { name: "email", value: formData.email },
        { name: "phone", value: formData.phone },
        {
          name: "message",
          value: [
            formData.address && `Property Address: ${formData.address}`,
            formData.message,
          ].filter(Boolean).join("\n"),
        },
      ],
    };
    submissionInFlight.current = true;
    setIsLoading(true);

    // Hubspot config
    var configHubspot = {
      method: "post",
      url: "/api/submit-hubspot-form",
      headers: { "Content-Type": "application/json" },
      data: dataPayload,
    };
    // Mailgun config
    var configSendMail = {
      method: "post",
      url: "/api/sendmail",
      headers: { "Content-Type": "application/json" },
      data: dataPayload,
    };

    Promise.all([axios(configHubspot), axios(configSendMail)])
      .then(function (response) {
        if (isQuoteSubmissionSuccessful(response)) {
          setIsLoading(false);
          setIsSuccess(true);
          setNewSubmission(false);
          setError(false);
          try {
            const address = googleAdsAddress.address || googleAdsAddress.pickUpAddress || {};
            trackQuoteSubmission({
              formData,
              formName,
              address,
              clickIds,
            });
          } catch {
            console.warn("Quote received, but conversion tracking could not be queued.");
          }
          router.push("/form-submitted/thank-you");
        } else {
          submissionInFlight.current = false;
          setIsLoading(false);
          setIsSuccess(false);
          setError(true);
          setNewSubmission(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        submissionInFlight.current = false;
        setIsLoading(false);
        setIsSuccess(false);
        setError(true);
        setNewSubmission(true);
      });
  };

  // is address field
  const isAddressField = (id) => {
    return ["address", "pickUpAddress", "dropOffAddress"].includes(id);
  };
  const renderField = (field) => {
    if (isAddressField(field.id)) {
      return (
        <React.Fragment key={field.id}>
          <GoogleAutocomplete
            id={field.id}
            className="mt-16"
            label={field.label}
            value={formData[field.id]} // pickUpAddress / dropOffAddress / address
            onChange={(value) => {
              handleChange(field.id, value);
              setGoogleAdsAddress((prevData) => ({ ...prevData, [field.id]: {} }));
            }}
            onSelect={(selectedAddress) => {
              // When user selects an address from suggestions
              setFormData((prevData) => ({
                ...prevData,
                [field.id]: selectedAddress.formattedAddress,
              }));
              setGoogleAdsAddress((prevData) => ({
                ...prevData,
                [field.id]: selectedAddress.unformattedAddress,
              })); // Set the address for Google Ads conversion tracking
              // Reset errors if any
              if (errors[field.id]) {
                setErrors({ ...errors, [field.id]: false });
              }
            }}
            required={field.required}
            autoComplete={field.autoComplete}
            error={errors[field.id]}
            helperText={errors[field.id] ? "Please enter a valid address" : ""}
          />
        </React.Fragment>
      );
    } else {
      return (
        <Input
          lightTheme={true}
          key={field.id}
          label={field.label}
          type={field.type}
          value={formData[field.id]}
          onChange={(event) => handleChange(field.id, event)}
          onBlur={
            field.required ? () => handleBlur(field.id, field.validation) : null
          }
          required={field.required}
          autoComplete={field.autoComplete}
          isInvalid={errors[field.id]}
          errorMessage={field.errorMessage}
          options={field.options}
          multipleValue={field.multiple}
          min={field.range && field.range.min}
          max={field.range && field.range.max}
          note={field.note && field.note}
          id={field.id}
        />
      );
    }
  };
  const nameFields = getQuoteFormData.filter((field) => ["firstname", "lastname"].includes(field.id));
  const formInputs = getQuoteFormData.filter((field) => !["firstname", "lastname"].includes(field.id)).map(renderField);

  return (
    <>
      <Container
        component="form"
        onSubmit={submitHandler}
        noValidate
        className={`${className || ""} ${styles.container} ${variant === "hero" ? styles.hero : ""}`}
        maxWidth="xl"
      >
        <Box sx={{ width: "100%" }}>
          <React.Fragment>
            <div className={`${styles.inputWrapper}`}>
              {!hideTitle && (
                <Typography
                  variant="h4"
                  component="h1"
                  className="title mt-8 mb-8 center-align"
                >
                  {title}
                </Typography>
              )}

              <div className={styles.nameRow}>
                {nameFields.map(renderField)}
              </div>
              {formInputs}

              <Button
                // newSubmission={newSubmission}
                type="submit"
                loading={isLoading}
                // isSuccess={isSuccess}
                variant="contained"
                className="mt-16 full-width"
                endIcon={variant === "hero" ? <ArrowForwardIcon /> : undefined}
              >
                {variant === "hero" ? "Submit" : "Get My Free Quote"}
              </Button>
              {!hideFooter && (
                <>
                  <Button
                    variant="text"
                    className="mt-8 align-center"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    href={cleaningPhoneHref}
                    startIcon={<LocalPhoneIcon />}
                  >
                    Prefer to talk? {cleaningPhone}
                  </Button>
                  <Typography
                    variant="body2"
                    component="div"
                    className="center-align"
                  >
                    Honest advice • Free Quote • No obligation
                  </Typography>
                </>
              )}

              {error && (
                <Alert sx={{ margin: "8px 0" }} severity="error">
                  Something went wrong. Please Try again
                </Alert>
              )}
            </div>
          </React.Fragment>
        </Box>
      </Container>
    </>
  );
}
