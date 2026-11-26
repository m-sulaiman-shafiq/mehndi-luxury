"use client";

import { useState, type FormEvent } from "react";

const contactEmail = "theroyalfabrics.fsd@gmail.com";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const orderNumber = String(formData.get("orderNumber") || "");
    const subject = String(formData.get("subject") || "Customer inquiry");
    const message = String(formData.get("message") || "");

    const emailBody = [
      `Name: ${name}`,
      `Customer email: ${email}`,
      `Order number: ${orderNumber || "Not provided"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const mailtoUrl =
      `mailto:${contactEmail}` +
      `?subject=${encodeURIComponent(`[The Mehndi Edit] ${subject}`)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[#EADFCB] bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Your name *
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Enter your name"
            className="mt-2 w-full rounded-xl border border-[#EADFCB] bg-[#FFFDF7] px-4 py-3 font-normal outline-none transition placeholder:text-[#A69B88] focus:border-[#D9B96A]"
          />
        </label>

        <label className="block text-sm font-medium">
          Email address *
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-2 w-full rounded-xl border border-[#EADFCB] bg-[#FFFDF7] px-4 py-3 font-normal outline-none transition placeholder:text-[#A69B88] focus:border-[#D9B96A]"
          />
        </label>

        <label className="block text-sm font-medium sm:col-span-2">
          Order number (optional)
          <input
            name="orderNumber"
            placeholder="e.g. MEH-12345678"
            className="mt-2 w-full rounded-xl border border-[#EADFCB] bg-[#FFFDF7] px-4 py-3 font-normal outline-none transition placeholder:text-[#A69B88] focus:border-[#D9B96A]"
          />
        </label>

        <label className="block text-sm font-medium sm:col-span-2">
          What can we help you with? *
          <select
            name="subject"
            required
            defaultValue=""
            className="mt-2 w-full rounded-xl border border-[#EADFCB] bg-[#FFFDF7] px-4 py-3 font-normal outline-none transition focus:border-[#D9B96A]"
          >
            <option value="" disabled>
              Select an inquiry
            </option>
            <option value="Product inquiry">Product inquiry</option>
            <option value="Custom stitching and measurements">
              Custom stitching and measurements
            </option>
            <option value="Order status">Order status</option>
            <option value="Shipping and delivery">Shipping and delivery</option>
            <option value="Payment inquiry">Payment inquiry</option>
            <option value="Return or order issue">Return or order issue</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="block text-sm font-medium sm:col-span-2">
          Your message *
          <textarea
            name="message"
            required
            rows={6}
            placeholder="Tell us how we can help..."
            className="mt-2 w-full resize-y rounded-xl border border-[#EADFCB] bg-[#FFFDF7] px-4 py-3 font-normal outline-none transition placeholder:text-[#A69B88] focus:border-[#D9B96A]"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-button-gradient px-7 py-4 font-semibold text-[#59402F] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:w-auto"
      >
        Prepare Email
      </button>

      {submitted && (
        <p className="mt-4 rounded-xl bg-[#F6CE69]/20 p-4 text-sm leading-6 text-[#59402F]">
          Your email app should open with your message prepared. Please send the
          email from there to complete your inquiry.
        </p>
      )}

      <p className="mt-5 text-xs leading-6 text-[#77704E]">
        This form prepares an email on your device. If your email app does not
        open, you can contact us directly at{" "}
        <a
          href={`mailto:${contactEmail}`}
          className="font-semibold underline underline-offset-4"
        >
          {contactEmail}
        </a>
        .
      </p>
    </form>
  );
}
