"use client";

import { useSearchParams } from "next/navigation";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_OPTIONS = ["Morning", "Afternoon", "Evening"];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const selectedYacht = searchParams.get("yacht") ?? "";

  const [state, handleSubmit] = useForm("mjgnqzol");

  if (state.succeeded) {
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

      {/* Yacht banner — shown only when arriving from a yacht card */}
      {selectedYacht && (
        <div className="flex items-center gap-3 border border-champagne-200 bg-champagne-50 px-5 py-4">
          <div className="h-8 w-0.5 bg-champagne-400 shrink-0" />
          <div>
            <p className="text-[0.65rem] font-sans tracking-[0.14em] uppercase text-champagne-600">
              Enquiring about
            </p>
            <p className="mt-0.5 font-serif text-lg text-ocean-700">{selectedYacht}</p>
          </div>
          {/* Hidden field so the yacht name is included in the Formspree submission */}
          <input type="hidden" name="yacht" value={selectedYacht} />
        </div>
      )}

      {/* Name row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="First Name" required>
          <input
            type="text"
            name="firstName"
            required
            className={inputCls}
            placeholder="Élise"
          />
          <ValidationError field="firstName" errors={state.errors} className="mt-1 text-xs text-red-500" />
        </Field>
        <Field label="Last Name" required>
          <input
            type="text"
            name="lastName"
            required
            className={inputCls}
            placeholder="Fontaine"
          />
          <ValidationError field="lastName" errors={state.errors} className="mt-1 text-xs text-red-500" />
        </Field>
      </div>

      {/* Contact row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Email Address" required>
          <input
            type="email"
            name="email"
            required
            className={inputCls}
            placeholder="elise@example.com"
          />
          <ValidationError field="email" errors={state.errors} className="mt-1 text-xs text-red-500" />
        </Field>
        <Field label="Phone" required>
          <input
            type="tel"
            name="phone"
            required
            className={inputCls}
            placeholder="+65 9123 4567"
          />
          <ValidationError field="phone" errors={state.errors} className="mt-1 text-xs text-red-500" />
        </Field>
      </div>

      {/* Date + Time row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Date" required>
          <input
            type="date"
            name="date"
            required
            className={cn(inputCls, "cursor-pointer")}
          />
          <ValidationError field="date" errors={state.errors} className="mt-1 text-xs text-red-500" />
        </Field>
        <Field label="Time of Charter" required>
          <select
            name="timeOfCharter"
            required
            defaultValue=""
            className={cn(inputCls, "appearance-none cursor-pointer")}
          >
            <option value="" disabled>Select a time…</option>
            {TIME_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <ValidationError field="timeOfCharter" errors={state.errors} className="mt-1 text-xs text-red-500" />
        </Field>
      </div>

      {/* Guests + Budget row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Number of Guests" required>
          <input
            type="number"
            name="guests"
            required
            min={1}
            max={100}
            className={inputCls}
            placeholder="8"
          />
          <ValidationError field="guests" errors={state.errors} className="mt-1 text-xs text-red-500" />
        </Field>
        <Field label="Budget (optional)">
          <input
            type="text"
            name="budget"
            className={inputCls}
            placeholder="e.g. SGD 3,000 – 5,000"
          />
        </Field>
      </div>

      {/* Message */}
      <Field label="Tell us about your ideal charter">
        <textarea
          name="message"
          rows={5}
          className={cn(inputCls, "resize-none")}
          placeholder="The style of yacht you have in mind, any special requests, occasions to celebrate…"
        />
        <ValidationError field="message" errors={state.errors} className="mt-1 text-xs text-red-500" />
      </Field>

      {/* General form error */}
      <ValidationError errors={state.errors} className="text-xs text-red-500" />

      <button
        type="submit"
        disabled={state.submitting}
        className={cn(
          "inline-flex items-center gap-3 bg-ocean-700 px-8 py-4 text-xs font-sans tracking-[0.12em] uppercase text-white transition-all duration-500",
          state.submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-ocean-600"
        )}
      >
        {state.submitting ? "Sending…" : "Send Enquiry"}
        {!state.submitting && <ArrowRight size={14} />}
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
