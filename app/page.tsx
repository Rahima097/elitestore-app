import { HeroSection } from "@/components/home/hero-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BlogSection } from "@/components/home/blog-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { ServiceHighlights } from "@/components/home/service-highlights"
import { FeaturedProducts } from "@/components/home/featured-products"
import { PopularCategories } from "@/components/home/popular-categories"
import { DailyDeals } from "@/components/home/daily-deals"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServiceHighlights />
        <PopularCategories />
        <FeaturedProducts/>
        <DailyDeals />       
        <BlogSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
