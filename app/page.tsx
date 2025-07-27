import { HeroSection } from "@/components/home/hero-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { BlogSection } from "@/components/home/blog-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  )
}
