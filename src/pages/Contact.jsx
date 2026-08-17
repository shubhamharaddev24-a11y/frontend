import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { leadService } from "../services";
import SocialFollowCard from "../components/SocialFollowCard";
import EnvelopeCard from "../components/EnvelopeCard";

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
  const [submittedData, setSubmittedData] = useState(null);
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
    <div className="bg-[#F2EDE4] dark:bg-[#181412] text-[#1A1A1A] dark:text-[#F2EDE4] min-h-screen pb-20 pt-32 px-6 sm:px-12">
      <section className="mx-auto max-w-5xl space-y-12">
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-4"
          initial={reduceMotion ? "show" : "hidden"}
          animate="show"
          variants={fadeUp}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#4A4A4A] dark:text-[#B8ABA0]">
            BOOK US / GET IN TOUCH
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] dark:text-[#F2EDE4] font-normal leading-tight">
            Let's Capture Your Story or Build Your Vision
          </h1>
          <p className="text-sm sm:text-base text-[#4A4A4A] dark:text-[#B8ABA0] font-light leading-relaxed">
            Reach out for wedding film bookings, pre-wedding couple shoots, custom web development, digital marketing, or local DTP tasks.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-[1.1fr,1.4fr]"
          initial={reduceMotion ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="space-y-6">
            <div className="space-y-5 rounded-none border border-[#E0D7CC]/70 dark:border-[#3D342E]/70 bg-white dark:bg-[#221C19] p-8 text-sm text-[#4A4A4A] dark:text-[#B8ABA0] font-light shadow-sm">
              <h2 className="font-serif text-xl font-normal text-[#1A1A1A] dark:text-[#F2EDE4]">
                Studio & Office Details
              </h2>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67C6B]">
                  Direct Call / WhatsApp
                </p>
                <p className="mt-1 text-sm font-medium text-[#1A1A1A] dark:text-[#F2EDE4]">
                  +91 92714 56749
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67C6B]">
                  Studio Address
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  Main bazaar road near bus stand, opposite Saralgaon Police Chowki, Murbad.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A67C6B]">
                  Working Hours
                </p>
                <p className="mt-1 text-sm">
                  Open Daily: <span className="text-[#1A1A1A] dark:text-[#F2EDE4]">9:00 AM – 8:00 PM</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-3">
                <a
                  href="tel:9271456749"
                  className="flex-1 text-center py-3 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-[#A67C6B]"
                >
                  Call Direct
                </a>
                <a
                  href="https://wa.me/919271456749?text=Hi%20Shubham%20Media%20%26%20Digital%20Services%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-3 border border-[#1A1A1A] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-[#A67C6B] hover:text-[#A67C6B]"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-none border border-[#E0D7CC]/70 dark:border-[#3D342E]/70 bg-white dark:bg-[#221C19] p-8 text-sm text-[#4A4A4A] dark:text-[#B8ABA0] shadow-sm">
            {successMessage && submittedData ? (
              <div className="flex flex-col items-center justify-center text-center gap-6 py-4 w-full">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl text-[#1A1A1A] dark:text-[#F2EDE4]">
                    Enquiry Sent Successfully!
                  </h2>
                  <p className="text-xs text-[#4A4A4A] dark:text-[#B8ABA0]">
                    We've received your request and will contact you shortly on WhatsApp.
                  </p>
                </div>
                
                <EnvelopeCard
                  title="Thank You!"
                  subtitle={`Hi ${submittedData.name}, we have received your request for ${submittedData.service}!`}
                  body={`Mobile: +91 ${submittedData.phone}`}
                  signature="SHUBHAM MEDIA"
                  useLogoSeal={true}
                />

                <button
                  onClick={() => {
                    setSuccessMessage("");
                    setSubmittedData(null);
                  }}
                  className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#A67C6B] underline"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <div className="w-full space-y-5">
                <h2 className="font-serif text-2xl font-normal text-[#1A1A1A] dark:text-[#F2EDE4]">
                  Send Us an Inquiry
                </h2>
                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setError("");
                    setSuccessMessage("");
                    
                    if (!form.name.trim() || !form.phone.trim()) {
                      setError("Please fill your name and mobile number.");
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
                      setSubmittedData({
                        name: form.name,
                        phone: form.phone,
                        service: form.service || "our services"
                      });
                      setSuccessMessage("Thank you for your enquiry!");
                      setForm({
                        name: "",
                        phone: "",
                        service: "",
                        date: "",
                        message: "",
                      });
                      
                      const base = "https://wa.me/919271456749?text=";
                      const lines = [
                        "New enquiry from Shubham Media website:",
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
                      setError("Failed to submit enquiry. Please contact us directly.");
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-wider text-[#88796E] dark:text-[#B8ABA0]">
                        Your name *
                      </label>
                      <input
                        type="text"
                        required
                        className="p-3 border border-[#E0D7CC] dark:border-[#3D342E] bg-[#FAF6F0] dark:bg-[#181412] text-[#4A3E37] dark:text-[#F2EDE4] outline-none focus:border-[#A67C6B]"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-wider text-[#88796E] dark:text-[#B8ABA0]">
                        Mobile number *
                      </label>
                      <input
                        type="tel"
                        required
                        className="p-3 border border-[#E0D7CC] dark:border-[#3D342E] bg-[#FAF6F0] dark:bg-[#181412] text-[#4A3E37] dark:text-[#F2EDE4] outline-none focus:border-[#A67C6B]"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-wider text-[#88796E] dark:text-[#B8ABA0]">
                      Service interested in
                    </label>
                    <select
                      className="p-3 border border-[#E0D7CC] dark:border-[#3D342E] bg-[#FAF6F0] dark:bg-[#181412] text-[#4A3E37] dark:text-[#F2EDE4] outline-none focus:border-[#A67C6B]"
                      value={form.service}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, service: e.target.value }))
                      }
                    >
                      <option value="">Select a service</option>
                      <option>Wedding photography & cinematography</option>
                      <option>Pre-wedding / portrait shoot</option>
                      <option>Custom Web Development (MERN)</option>
                      <option>Digital Marketing & SEO Setup</option>
                      <option>Banners, cards & graphic branding</option>
                      <option>DTP, biodata & document services</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-wider text-[#88796E] dark:text-[#B8ABA0]">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      className="p-3 border border-[#E0D7CC] dark:border-[#3D342E] bg-[#FAF6F0] dark:bg-[#181412] text-[#4A3E37] dark:text-[#F2EDE4] outline-none focus:border-[#A67C6B]"
                      value={form.date}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, date: e.target.value }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs uppercase tracking-wider text-[#88796E] dark:text-[#B8ABA0]">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      className="p-3 border border-[#E0D7CC] dark:border-[#3D342E] bg-[#FAF6F0] dark:bg-[#181412] text-[#4A3E37] dark:text-[#F2EDE4] outline-none focus:border-[#A67C6B]"
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="Details about your event or project..."
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-red-500">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#4A3E37] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-[#A67C6B] disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Send Inquiry"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>

        {/* Map */}
        <div className="overflow-hidden border border-[#E0D7CC]/70 dark:border-[#3D342E]/70 bg-white dark:bg-[#221C19]">
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

