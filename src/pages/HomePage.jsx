import React from "react";
import HeroSection from "../components/HomePage/HeroSection";
import AboutUs from "../components/HomePage/AboutUs";
import StatSection from "../components/HomePage/StatSection";
import TopScholarships from "../components/HomePage/TopScholarships";
import TestimonialCarousel from "../components/HomePage/TestimonialCarousel";
import PartnerMarquee from "../components/HomePage/PartnerMarquee";
import MailSubscription from "../components/HomePage/MailSubscription";
import ContactForm from "../components/HomePage/ContactForm";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <TopScholarships />
      <StatSection />
      <TestimonialCarousel />
      <MailSubscription />
      <PartnerMarquee />
      <ContactForm />
    </div>
  );
}

export default HomePage;
