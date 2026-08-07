import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { WhyKlaiberg } from "@/components/sections/why-klaiberg"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { FaqSection } from "@/components/sections/faq-section"
import { AwardsSection } from "@/components/sections/awards-section"
import { AboutPreview } from "@/components/sections/about-preview"
import { ArticlesStrip } from "@/components/sections/articles-strip"
import { WhyUs } from "@/components/sections/why-us"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <WhyKlaiberg />
      <FeaturedProducts />
      <FaqSection />
      <AboutPreview />
      <AwardsSection />
      <ArticlesStrip />
      <WhyUs />
      <Footer />
    </main>
  )
}
