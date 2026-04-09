import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Check } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }, 3000);
  };

  return (
    <div className="min-h-screen bg-dark-950 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-brand-orange text-sm font-semibold uppercase tracking-wider mb-3">Get in Touch</p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">Contact Us</h1>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">Have a question, a bulk order inquiry, or need a custom quote? We're here to help.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              { icon: Mail, title: "Email Us", detail: "hello@instaprinting.ca", sub: "We reply within 2 hours" },
              { icon: Phone, title: "Call Us", detail: "+1 (800) 555-0199", sub: "Mon–Fri, 9AM–6PM EST" },
              { icon: MapPin, title: "Our Studio", detail: "123 Print Ave, NYC 10001", sub: "By appointment only" },
              { icon: Clock, title: "Turnaround", detail: "48-Hour Standard", sub: "Same-day available" },
            ].map(({ icon: Icon, title, detail, sub }) => (
              <div key={title} className="flex gap-4 bg-dark-800 border border-dark-600/50 rounded-3xl p-5 hover:border-brand-orange/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-brand-orange" />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{title}</p>
                  <p className="text-neutral-300 text-sm">{detail}</p>
                  <p className="text-neutral-600 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 bg-dark-800 border border-dark-600/50 rounded-3xl p-8">
            <h2 className="font-display font-semibold text-white text-2xl mb-6">Send a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full bg-dark-700 border border-dark-600 focus:border-brand-orange/50 text-white placeholder:text-neutral-600 px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-dark-700 border border-dark-600 focus:border-brand-orange/50 text-white placeholder:text-neutral-600 px-4 py-3 rounded-xl text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5">Subject</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-dark-700 border border-dark-600 focus:border-brand-orange/50 text-white px-4 py-3 rounded-xl text-sm outline-none appearance-none transition-colors"
                >
                  <option value="">Select a topic...</option>
                  <option>Bulk / Corporate Order</option>
                  <option>Custom Quote</option>
                  <option>Order Status</option>
                  <option>Design Help</option>
                  <option>Return / Refund</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1.5">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project, quantity needed, deadline, and any design files you have..."
                  className="w-full bg-dark-700 border border-dark-600 focus:border-brand-orange/50 text-white placeholder:text-neutral-600 px-4 py-3 rounded-xl text-sm outline-none resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-white transition-all duration-300 ${
                  sent ? "bg-emerald-600" : "bg-brand-orange hover:bg-brand-orange-light btn-glow"
                }`}
              >
                {sent ? <><Check className="w-4 h-4" /> Message Sent!</> : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl text-white mb-3">Frequently Asked</h2>
            <p className="text-neutral-500">Quick answers to common questions.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { q: "What is the minimum order quantity?", a: "No minimums for DTG printing. Screen printing requires 24+ pieces per design." },
              { q: "How fast can you produce my order?", a: "Standard is 48 hours. Same-day production is available on orders placed before 2PM EST." },
              { q: "Can you match my brand colors (Pantone)?", a: "Yes! We offer Pantone-matched screen printing for all brand color requirements." },
              { q: "What file formats do you accept?", a: "We accept PNG, JPG, PDF, SVG, and AI files. For best results, use vector files at 300+ DPI." },
              { q: "Do you offer bulk discounts?", a: "Yes — discounts start at 25 units. Contact us for a custom quote on larger orders." },
              { q: "What is your return policy?", a: "We offer free reprints within 30 days if the product has a defect or print error." },
            ].map(({ q, a }) => (
              <div key={q} className="bg-dark-800 border border-dark-600/50 rounded-2xl p-5 hover:border-brand-orange/20 transition-colors">
                <p className="font-semibold text-white text-sm mb-2">{q}</p>
                <p className="text-neutral-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
