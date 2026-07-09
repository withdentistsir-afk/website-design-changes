import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { WhyUs } from "@/components/sections/why-us"
import { CategoriesSection } from "@/components/sections/categories-section"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { AboutPreview } from "@/components/sections/about-preview"
import { StatsSection } from "@/components/sections/stats-section"
import { AwardsSection } from "@/components/sections/awards-section"
import { ContactCTA } from "@/components/sections/contact-cta"
import { ParallaxSection } from "@/components/parallax-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <ParallaxSection>
        <WhyUs />
      </ParallaxSection>
      <CategoriesSection />
      <ParallaxSection>
        <FeaturedProducts />
      </ParallaxSection>
      <AboutPreview />
      <StatsSection />
      <ParallaxSection>
        <AwardsSection />
      </ParallaxSection>
      <ContactCTA />
      <Footer />
    </main>
  )
}
