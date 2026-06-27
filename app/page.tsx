import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { WhyUs } from "@/components/sections/why-us"
import { CategoriesSection } from "@/components/sections/categories-section"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { AboutPreview } from "@/components/sections/about-preview"
import { StatsSection } from "@/components/sections/stats-section"
import { ContactCTA } from "@/components/sections/contact-cta"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhyUs />
      <CategoriesSection />
      <FeaturedProducts />
      <AboutPreview />
      <StatsSection />
      <ContactCTA />
      <Footer />
    </main>
  )
}
