import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/sections/hero"
import { CategoriesSection } from "@/components/sections/categories-section"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { FaqArticles } from "@/components/sections/faq-articles"
import { WhyUs } from "@/components/sections/why-us"
import { AwardsSection } from "@/components/sections/awards-section"
import { AboutPreview } from "@/components/sections/about-preview"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <FaqArticles />
      <AboutPreview />
      <AwardsSection />
      <WhyUs />
      <Footer />
    </main>
  )
}
