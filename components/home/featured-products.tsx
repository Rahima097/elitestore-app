"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Eye, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 124,
    image: "/images/products/Premium Wireless Headphones.jpg?height=300&width=300",
    badge: "Best Seller",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Designer Leather Jacket",
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviews: 89,
    image: "/images/products/Designer Leather Jacket.jpg?height=300&width=300",
    badge: "New",
    category: "Fashion",
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviews: 156,
    image: "/images/products/Smart Fitness Watch.jpg?height=300&width=300",
    badge: "Sale",
    category: "Electronics",
  },
  {
    id: 4,
    name: "Minimalist Backpack",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviews: 203,
    image: "/images/products/Minimalist Backpack.jpg?height=300&width=300",
    badge: "Popular",
    category: "Accessories",
  },
  {
    id: 5,
    name: "Organic Skincare Set",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.9,
    reviews: 78,
    image: "/images/products/Organic Skincare Set.jpg?height=300&width=300",
    badge: "Limited",
    category: "Beauty",
  },
  {
    id: 6,
    name: "Professional Camera Lens",
    price: 599.99,
    originalPrice: 799.99,
    rating: 4.8,
    reviews: 45,
    image: "/images/products/Professional Camera Lens.jpg?height=300&width=300",
    badge: "Pro",
    category: "Photography",
  },
]

export function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">Featured Collection</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Trending Products
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium products that are loved by thousands of customers worldwide
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badge */}
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                      {product.badge}
                    </Badge>

                    {/* Quick Actions */}
                    <div
                      className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${
                        hoveredProduct === product.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                      }`}
                    >
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Quick Add to Cart */}
                    <div
                      className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
                        hoveredProduct === product.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      <Badge variant="destructive" className="text-xs">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
