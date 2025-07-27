import { HeroSection } from "@/components/home/hero-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BlogSection } from "@/components/home/blog-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { ServiceHighlights } from "@/components/home/service-highlights"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServiceHighlights />
        <BlogSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
