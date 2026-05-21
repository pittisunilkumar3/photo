"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Heart,
  Mountain,
  Building,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Photography",
    description:
      "Capturing the magic of your special day with an artistic, documentary approach. Every tear, every laugh, every kiss preserved forever.",
    price: "From ₹2,500",
    features: ["Full day coverage", "Second photographer", "Online gallery", "500+ edited photos"],
    popular: true,
  },
  {
    icon: Camera,
    title: "Portrait Sessions",
    description:
      "Professional portraits that reveal your authentic self. Perfect for professionals, artists, families, or anyone who wants to look their best.",
    price: "From ₹450",
    features: ["1-2 hour session", "Multiple outfits", "Retouched images", "Print rights"],
    popular: false,
  },
  {
    icon: Mountain,
    title: "Landscape & Travel",
    description:
      "Breathtaking landscape photography for prints, publications, and commercial use. Available for assignments worldwide.",
    price: "Custom Quote",
    features: ["Location scouting", "Golden hour shoots", "Aerial drone shots", "Fine art prints"],
    popular: false,
  },
  {
    icon: Building,
    title: "Commercial & Brand",
    description:
      "Elevate your brand with stunning visual content. Product photography, corporate headshots, and brand storytelling.",
    price: "From ₹1,200",
    features: ["Creative direction", "Brand consultation", "Multiple formats", "Usage licensing"],
    popular: false,
  },
  {
    icon: Users,
    title: "Event Photography",
    description:
      "Professional coverage for corporate events, galas, conferences, and private parties. Candid and posed shots that capture the energy.",
    price: "From ₹800",
    features: ["4-8 hour coverage", "Same-day previews", "Group photos", "Online gallery"],
    popular: false,
  },
  {
    icon: Sparkles,
    title: "Fine Art & Editorial",
    description:
      "Conceptual and artistic photography for magazines, galleries, and personal projects. Pushing creative boundaries together.",
    price: "Custom Quote",
    features: ["Creative concepts", "Styling assistance", "Post-production", "Exhibition prints"],
    popular: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 relative bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-accent font-medium">
            Services
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900">
            What I <span className="text-gradient">Offer</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Tailored photography services to meet your unique vision and needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 border border-gray-100 hover:border-accent/30 hover:shadow-lg transition-all duration-500"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute -top-3 right-6 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-accent" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <span className="text-accent font-display font-bold">
                  {service.price}
                </span>
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-accent transition-colors group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 mb-6">
            Need something custom? Let&apos;s discuss your vision.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-full hover:shadow-xl hover:shadow-accent/25 transition-all duration-300"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
