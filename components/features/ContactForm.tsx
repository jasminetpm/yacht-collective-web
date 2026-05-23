"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  destination: string;
  dates: string;
  guests: string;
  message: string;
}

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  destination: "",
  dates: "",
  guests: "",
  message: "",
};

const DESTINATIONS = [
  "Mediterranean",
  "Caribbean",
  "South East Asia",
  "Indian Ocean",
  "Northern Europe",
  "Other / Unsure",
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 py-10">
        <CheckCircle size={32} className="text-champagne-500" />
        <h3 className="font-serif text-2xl text-ocean-700">
          Thank you for your enquiry
        </h3>
        <p className="text-sm leading-relaxed text-charcoal-500 max-w-sm">
          A member of our concierge team will be in touch within one business
          day to discuss your charter requirements.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="First Name" required>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className={inputCls}
            placeholder="Élise"
          />
        </Field>
        <Field label="Last Name" required>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className={inputCls}
            placeholder="Fontaine"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email Address" required>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputCls}
            placeholder="elise@example.com"
          />
        </Field>
        <Field label="Phone (optional)">
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={inputCls}
            placeholder="+1 212 555 0190"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Preferred Destination">
          <select
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className={cn(inputCls, "appearance-none cursor-pointer")}
          >
            <option value="">Select a region…</option>
            {DESTINATIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Approximate Dates">
          <input
            type="text"
            name="dates"
            value={form.dates}
            onChange={handleChange}
            className={inputCls}
            placeholder="e.g. August 2026, 2 weeks"
          />
        </Field>
      </div>

      <Field label="Number of Guests">
        <input
          type="number"
          name="guests"
          value={form.guests}
          onChange={handleChange}
          min={1}
          max={30}
          className={inputCls}
          placeholder="8"
        />
      </Field>

      <Field label="Tell us about your ideal charter">
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className={cn(inputCls, "resize-none")}
          placeholder="The style of yacht you have in mind, activities, any special requests…"
        />
      </Field>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          "inline-flex items-center gap-3 bg-ocean-700 px-8 py-4 text-xs font-sans tracking-[0.12em] uppercase text-white transition-all duration-500",
          loading
            ? "opacity-60 cursor-not-allowed"
            : "hover:bg-ocean-600"
        )}
      >
        {loading ? "Sending…" : "Send Enquiry"}
        {!loading && <ArrowRight size={14} />}
      </button>
    </form>
  );
}

const inputCls =
  "w-full border border-alabaster-dark bg-pearl px-4 py-3 text-sm text-charcoal-700 placeholder:text-charcoal-300 focus:border-ocean-700 focus:outline-none transition-colors duration-300";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-sans tracking-[0.1em] uppercase text-charcoal-500">
        {label}
        {required && <span className="ml-1 text-champagne-600">*</span>}
      </label>
      {children}
    </div>
  );
}
