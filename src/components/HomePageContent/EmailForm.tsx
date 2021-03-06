import { Button, Input } from "@govtechsg/tradetrust-ui-components";
import React, { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import { CheckboxDefault } from "./../UI/Checkbox";
import { TextareaDefault } from "./../UI/Textarea";

export const optionsBusiness = [
  { value: "Shipper", label: "Shipper" },
  { value: "Shipping line", label: "Shipping line" },
  { value: "Public Sector", label: "Public Sector" },
  { value: "Tech/Platform Provider", label: "Tech/Platform Provider" },
  { value: "Port Operator", label: "Port Operator" },
  { value: "International Organisation", label: "International Organisation" },
  { value: "Trade Association", label: "Trade Association" },
  { value: "Others", label: "Others" },
];

export const optionsRegion = [
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Middle East", label: "Middle East" },
  { value: "Oceania", label: "Oceania" },
  { value: "North America", label: "North America" },
  { value: "South Amercia", label: "South Amercia" },
  { value: "Africa", label: "Africa" },
];

export const encode = (data: { [x: string]: string | number | boolean }): string => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export const EmailForm: FunctionComponent = () => {
  const [form, setForm] = useState({
    "Receive communications": "No",
  } as any);
  const history = useHistory();

  const handleInputOrTextareaChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.checked ? "Yes" : "No" });
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...form }),
    })
      .then(() => {
        history.push("/email/success");
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
  };

  return (
    <form name="contact" className="my-6" onSubmit={handleFormSubmit}>
      <input type="hidden" name="form-name" value="contact" />
      <div className="flex flex-wrap">
        <div className="w-full md:w-7/12 xl:w-5/12 mx-auto">
          <Input
            type="text"
            name="Full Name"
            placeholder="Full Name"
            required
            onChange={handleInputOrTextareaChange}
            className="mb-2"
          />
          <Input
            type="email"
            name="Email"
            placeholder="Email Address"
            required
            onChange={handleInputOrTextareaChange}
            className="mb-2"
          />
          <Input
            type="text"
            name="Organisation"
            placeholder="Name of your organisation"
            required
            onChange={handleInputOrTextareaChange}
            className="mb-2"
          />
          <TextareaDefault name="Message" placeholder="Message" required onChange={handleInputOrTextareaChange} />
          <div className="my-6">
            <div className="mb-6">
              <h6>Consent to communicate</h6>
              <p>
                TradeTrust is committed to protecting and respecting your privacy. From time to time, we would like to
                contact you about our products and services, as well as other content that may be of interest to you. If
                you consent to us contacting you for this purpose, please tick below.
              </p>
            </div>
            <div className="mb-6">
              <h6>Consent to process data *</h6>
              <p>
                In order to contact you or provide the content requested, we need to store and process the personal data
                you provide us. If you consent to us storing your personal data for this purpose, please tick the
                checkbox below.
              </p>
            </div>
            <div className="mb-6">
              <p>You can unsubscribe from these communications at any time.</p>
            </div>
            <CheckboxDefault
              name="Receive communications"
              text="I agree to receive other communications from TradeTrust."
              onChange={handleCheckboxChange}
            />
            <CheckboxDefault
              name="Personal Data"
              text="I agree to allow TradeTrust to store and process my personal data.*"
              required
            />
          </div>
          <Button className="bg-orange text-white hover:bg-orange-600 w-full">Send Enquiry</Button>
        </div>
      </div>
    </form>
  );
};
