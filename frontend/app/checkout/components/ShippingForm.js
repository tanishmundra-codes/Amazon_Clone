"use client";

import { useState } from "react";

const FIELDS = [
  { key: "fullName",        label: "Full Name",     type: "text", placeholder: "John Doe",              span: false },
  { key: "phone",           label: "Phone Number",  type: "tel",  placeholder: "+91 98765 43210",       span: false },
  { key: "shippingAddress", label: "Address",       type: "text", placeholder: "House No., Street, Area", span: true },
  { key: "city",            label: "City",          type: "text", placeholder: "Mumbai",                span: false },
  { key: "state",           label: "State",         type: "text", placeholder: "Maharashtra",           span: false },
  { key: "zipCode",         label: "PIN Code",      type: "text", placeholder: "400001",                span: false },
];

export default function ShippingForm({ values, onChange, onNext, user }) {
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    FIELDS.forEach(({ key, label }) => {
      if (!values[key]?.trim()) errs[key] = `${label} is required`;
    });
    if (values.zipCode && !/^\d{5,6}$/.test(values.zipCode.trim()))
      errs.zipCode = "Enter a valid PIN code (5–6 digits)";
    if (values.phone && !/^[\d\s+\-()]{7,15}$/.test(values.phone.trim()))
      errs.phone = "Enter a valid phone number";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onNext();
  }

  function handleChange(key, value) {
    onChange((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  return (
    <div className="bg-white rounded-sm shadow-sm p-6">
      <h2 className="text-xl font-medium text-[#0f1111] mb-1">Shipping Address</h2>
      {user?.name && (
        <p className="text-sm text-gray-500 mb-5">Delivering to: {user.name}</p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIELDS.map(({ key, label, type, placeholder, span }) => (
            <div key={key} className={span ? "sm:col-span-2" : ""}>
              <label
                htmlFor={key}
                className="block text-sm font-medium text-[#0f1111] mb-1"
              >
                {label}
              </label>
              <input
                id={key}
                type={type}
                value={values[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={placeholder}
                className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#e77600] ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[key] && (
                <p className="text-xs text-red-600 mt-1">{errors[key]}</p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 w-full sm:w-auto px-8 py-2 bg-[#ffd814] hover:bg-[#f7ca00] border border-[#FCD200] rounded-lg text-sm font-medium text-[#0f1111] transition-colors cursor-pointer"
        >
          Continue to Review
        </button>
      </form>
    </div>
  );
}
