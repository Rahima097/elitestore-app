"use client"

import Link from "next/link"
import { ShoppingBag, Monitor, Shirt, Footprints, Heart, Gamepad2 } from "lucide-react"
import { motion } from "framer-motion"

const categories = [
  {
    name: "Bags",
    icon: ShoppingBag,
    href: "/categories/bags",
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
  {
    name: "Electronics",
    icon: Monitor,
    href: "/categories/electronics",
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    name: "Fashion",
    icon: Shirt,
    href: "/categories/fashion",
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
  {
    name: "Footwear",
    icon: Footprints,
    href: "/categories/footwear",
    color: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    name: "Health & Beauty",
    icon: Heart,
    href: "/categories/health-beauty",
    color: "text-pink-500",
    bgColor: "bg-pink-50 dark:bg-pink-950/20",
  },
  {
    name: "Toys & Accessories",
    icon: Gamepad2,
    href: "/categories/toys-accessories",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
  },
]

export function PopularCategories() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
          <p className="text-muted-foreground">Browse our most popular product categories</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={category.href}>
                <div className="group text-center">
                  <div
                    className={`w-20 h-20 mx-auto rounded-2xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg`}
                  >
                    <category.icon className={`h-10 w-10 ${category.color}`} />
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-orange-500 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
