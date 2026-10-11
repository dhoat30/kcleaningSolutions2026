export const getQuoteFormData = [
  {
    id: "firstname",
    label: "First name",
    type: "text",
    required: true,
    autoComplete: "given-name",
    validation: (value) => {
      if (typeof value === "string") {
        return value.trim().length > 0;
      }
      return false;
    },
    errorMessage: "Enter your first name",
  },
  {
    id: "lastname",
    label: "Last name",
    type: "text",
    required: true,
    autoComplete: "family-name",
    validation: (value) => typeof value === "string" && value.trim().length > 0,
    errorMessage: "Enter your last name",
  },
  {
    id: "email",
    label: "Email address",
    type: "email",
    required: true,
    autoComplete: "email",
    validation: (value) => /\S+@\S+\.\S+/.test(value),
    errorMessage: "Enter a valid email address",
  },
  {
    id: "phone",
    label: "Phone number",
    type: "tel",
    required: false,
    autoComplete: "tel",
    validation: (value) => {
      const cleanPhone = (value || "").replace(/[^0-9]/g, "");
      return cleanPhone.length > 6; // Matches numbers having more than 6 characters
    },
    errorMessage: "Please enter a valid New Zealand phone number",
  },
  {
    id: "address",
    label: "Property address",
    type: "text",
    required: false,
    autoComplete: "street-address",
  },

  {
    id: "message",
    label: "Message (optional)",
    type: "textarea",
    required: false,
  },
];
