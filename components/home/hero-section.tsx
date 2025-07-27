"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, ShoppingBag, Play, TrendingUp, Users, Award } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const heroSlides = [
  {
    id: 1,
    title: "Premium Collection 2024",
    subtitle: "Discover Luxury Redefined",
    description: "Explore our curated selection of premium products designed for the modern lifestyle",
    image: "/images/hero-1.avif",
    cta: "Shop Collection",
    badge: "New Arrival",
    color: "from-purple-600 to-blue-600",
  },
  {
    id: 2,
    title: "Tech Innovation Hub",
    subtitle: "Future is Here",
    description: "Experience cutting-edge technology with our latest gadgets and smart devices",
    image: "/images/hero-2.avif",
    cta: "Explore Tech",
    badge: "Trending",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 3,
    title: "Fashion Forward",
    subtitle: "Style Meets Comfort",
    description: "Elevate your wardrobe with our exclusive fashion collection",
    image: "/images/hero-3.png",
    cta: "Shop Fashion",
    badge: "Limited Edition",
    color: "from-indigo-600 to-purple-600",
  },
]

const stats = [
  { icon: Users, label: "Happy Customers", value: "50K+", color: "text-purple-600" },
  { icon: ShoppingBag, label: "Products", value: "10K+", color: "text-blue-600" },
  { icon: Award, label: "Awards Won", value: "25+", color: "text-indigo-600" },
  { icon: TrendingUp, label: "Growth Rate", value: "300%", color: "text-green-600" },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentHero = heroSlides[currentSlide]

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-indigo-950/20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[90vh] py-12">
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`inline-flex items-center space-x-2 bg-gradient-to-r ${currentHero.color} text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg`}
              >
                <Star className="h-4 w-4" />
                <span>{currentHero.badge}</span>
              </motion.div>

              {/* Title */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-7xl font-bold leading-tight"
                >
                  <span className={`bg-gradient-to-r ${currentHero.color} bg-clip-text text-transparent`}>
                    {currentHero.title}
                  </span>
                </motion.h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl lg:text-3xl font-semibold text-muted-foreground"
                >
                  {currentHero.subtitle}
                </motion.h2>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground max-w-md leading-relaxed"
              >
                {currentHero.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className={`bg-gradient-to-r ${currentHero.color} hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300`}
                  asChild
                >
                  <Link href="/products">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    {currentHero.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group bg-transparent" asChild>
                  <Link href="/about">
                    <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm mb-2 group-hover:scale-110 transition-transform`}
                    >
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Hero Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`image-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src={currentHero.image || "/placeholder.svg"}
                  alt={currentHero.title}
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Floating Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Live Shopping</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg backdrop-blur-sm"
                >
                  <div className="text-center">
                    <div
                      className={`text-2xl font-bold bg-gradient-to-r ${currentHero.color} bg-clip-text text-transparent`}
                    >
                      50%
                    </div>
                    <div className="text-xs text-muted-foreground">OFF Today</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? `bg-gradient-to-r ${currentHero.color} w-8` : "bg-gray-300 hover:bg-gray-400 w-3"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <div className="w-1 h-3 bg-current rounded-full animate-bounce mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
