import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { leadService } from "../services";

const Contact = () => {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
      },
    }),
    [],
  );

  return (
    <div className="bg-brandBg pb-16 pt-24 text-brandTextPrimary sm:pt-28">
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8 space-y-3 sm:mb-10"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brandAccentSoft">
            Contact
          </p>
          <h1 className="text-2xl font-semibold text-brandTextPrimary sm:text-3xl">
            Visit, call or message Shubham Photos Studio.
          </h1>
          <p className="max-w-2xl text-sm text-brandTextMuted sm:text-base">
            We are happy to talk about weddings, albums, banners, passport
            photos or any studio work you need. Calls and messages are answered
            by the studio team directly.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-[1.15fr,1.4fr]"
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="space-y-4 rounded-2xl border border-brandBorder bg-brandSurface/80 p-5 text-sm text-brandTextMuted">
            <h2 className="text-sm font-semibold text-brandTextPrimary">
              Studio contact details
            </h2>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandTextMuted">
                Phone
              </p>
              <p className="mt-1 text-sm text-brandTextPrimary">
                +91 92714 56749
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandTextMuted">
                WhatsApp
              </p>
              <p className="mt-1 text-sm text-brandTextPrimary">
                +91 92714 56749
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandTextMuted">
                Studio address
              </p>
              <p className="mt-1 text-sm">
                Main bazaar road near bus stand, close to police chowki , saralgaon , murbad.
                The studio is on the 1st floor with clear board outside.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brandTextMuted">
                Working hours
              </p>
              <p className="mt-1 text-sm">
                Every day: <span className="text-brandTextPrimary">9:00 AM – 8:00 PM</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-2 text-xs">
              <a
                href="tel:9271456749"
                className="inline-flex flex-1 items-center justify-center rounded-full bg-brandAccent px-5 py-2 font-semibold text-white shadow-md shadow-brandAccent/30 hover:bg-brandAccentSoft"
              >
                Call Now
              </a>
              <a
                href="https://wa.me/919271456749?text=Hi%20Shubham%20Photos%20Studio%2C%20I%20would%20like%20to%20book%20a%20shoot%20or%20know%20your%20prices."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-brandAccent/60 bg-brandSurface px-5 py-2 font-semibold text-brandAccent hover:bg-brandSurfaceSoft"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
          {/* Enquiry / booking form */}
          <div className="space-y-4 rounded-2xl border border-brandBorder bg-brandSurface p-5 text-sm text-brandTextMuted">
            <h2 className="text-sm font-semibold text-brandTextPrimary">
              Booking & enquiry form
            </h2>
            <p className="text-xs text-brandTextMuted">
              Share a few details and we will respond on call or WhatsApp with
              availability and pricing.
            </p>
            <form
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                setError("");
                setSuccessMessage("");
                
                if (!form.name.trim() || !form.phone.trim()) {
                  setError("Please fill your name and mobile number so we can contact you.");
                  return;
                }

                setIsSubmitting(true);
                
                try {
                  const leadData = {
                    name: form.name,
                    phone: form.phone,
                    email: form.email || '',
                    service: form.service,
                    preferredDate: form.date,
                    message: form.message,
                    source: 'website',
                    status: 'new'
                  };
                  
                  await leadService.createLead(leadData);
                  setSuccessMessage("Thank you for your enquiry! We will contact you soon.");
                  setForm({
                    name: "",
                    phone: "",
                    service: "",
                    date: "",
                    message: "",
                  });
                  
                  // Also open WhatsApp as backup
                  const base = "https://wa.me/919271456749?text=";
                  const lines = [
                    "New enquiry from Shubham Photos Studio website:",
                    "",
                    `Name: ${form.name}`,
                    `Mobile: ${form.phone}`,
                    form.service ? `Interested in: ${form.service}` : "",
                    form.date ? `Preferred date: ${form.date}` : "",
                    form.message ? `Message: ${form.message}` : "",
                  ]
                    .filter(Boolean)
                    .join("%0A");
                  const url = base + lines;
                  if (typeof window !== "undefined") {
                    window.open(url, "_blank");
                  }
                } catch (err) {
                  setError("Failed to submit enquiry. Please try again or contact us directly.");
                  console.error('Lead submission error:', err);
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-brandTextMuted">
                    Your name *
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-brandBorder bg-brandSurfaceSoft/70 px-3 py-2 text-sm text-brandTextPrimary outline-none ring-0 focus:border-brandAccent focus:ring-1 focus:ring-brandAccent/60"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-brandTextMuted">
                    Mobile number *
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-brandBorder bg-brandSurfaceSoft/70 px-3 py-2 text-sm text-brandTextPrimary outline-none ring-0 focus:border-brandAccent focus:ring-1 focus:ring-brandAccent/60"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-brandTextMuted">
                  What do you want to book?
                </label>
                <select
                  className="w-full rounded-lg border border-brandBorder bg-brandSurfaceSoft/70 px-3 py-2 text-sm text-brandTextPrimary outline-none ring-0 focus:border-brandAccent focus:ring-1 focus:ring-brandAccent/60"
                  value={form.service}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, service: e.target.value }))
                  }
                >
                  <option value="">Select a service</option>
                  <option>Wedding photography & video</option>
                  <option>Pre-wedding shoot</option>
                  <option>Passport photos / prints</option>
                  <option>Wedding cards (लग्नपत्रिका)</option>
                  <option>Banners / flex / posters</option>
                  <option>DTP / biodata / CV</option>
                  <option>Other studio service</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-brandTextMuted">
                  Preferred date (optional)
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-brandBorder bg-brandSurfaceSoft/70 px-3 py-2 text-sm text-brandTextPrimary outline-none ring-0 focus:border-brandAccent focus:ring-1 focus:ring-brandAccent/60"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-brandTextMuted">
                  Anything else we should know?
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-brandBorder bg-brandSurfaceSoft/70 px-3 py-2 text-sm text-brandTextPrimary outline-none ring-0 focus:border-brandAccent focus:ring-1 focus:ring-brandAccent/60"
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="Example: village name, number of days, timing, or special requirement."
                />
              </div>
              {error && (
                <p className="text-xs font-medium text-amber-300">{error}</p>
              )}
              {successMessage && (
                <p className="text-xs font-medium text-green-400">{successMessage}</p>
              )}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-brandAccent px-5 py-2.5 text-sm font-semibold text-black shadow-md shadow-brandAccent/40 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              >
                {isSubmitting ? "Submitting..." : "Send enquiry on WhatsApp"}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Map below on its own row for clarity */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-brandBorder bg-brandSurface">
          <iframe
            title="Shubham Photos Studio map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231.69221193805333!2d73.49234646000684!3d19.28593803191094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd6354ef9e4943%3A0xcf202aae594562d2!2sShubham%20photos%20studio%20%26%20printing%20press!5e1!3m2!1sen!2sin!4v1771245383413!5m2!1sen!2sin"
            className="h-64 w-full border-0 md:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;

