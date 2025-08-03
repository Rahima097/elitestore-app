"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock } from "lucide-react"
import { motion } from "framer-motion"

const dailyDeals = [
  {
    id: 1,
    name: "Beats Solo 3",
    originalPrice: 199.99,
    salePrice: 89.99,
    rating: 4.5,
    reviews: 128,
    image: "/images/products/Beats Solo 3.avif?height=200&width=200&text=Beats+Solo+3",
    timeLeft: { hours: 7, minutes: 22, seconds: 45 },
    discount: 55,
  },
  {
    id: 2,
    name: "Magic Cinema Pro",
    originalPrice: 2499.99,
    salePrice: 1799.99,
    rating: 4.8,
    reviews: 89,
    image: "/images/products/Magic Cinema Pro.jpg?height=200&width=200&text=Magic+Cinema",
    timeLeft: { hours: 12, minutes: 15, seconds: 30 },
    discount: 28,
  },
]

export function DailyDeals() {
  const [timeLeft, setTimeLeft] = useState(dailyDeals.map((deal) => deal.timeLeft))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) =>
        prevTime.map((time) => {
          let { hours, minutes, seconds } = time

          if (seconds > 0) {
            seconds--
          } else if (minutes > 0) {
            minutes--
            seconds = 59
          } else if (hours > 0) {
            hours--
            minutes = 59
            seconds = 59
          }

          return { hours, minutes, seconds }
        }),
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Daily Deals</h2>
          <p className="text-orange-100">Limited time offers - Don't miss out!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {dailyDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={deal.image || "/placeholder.svg"}
                        alt={deal.name}
                        className="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">-{deal.discount}%</Badge>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{deal.name}</h3>

                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(deal.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({deal.reviews})</span>
                      </div>

                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-2xl font-bold text-blue-600">${deal.salePrice}</span>
                        <span className="text-lg text-muted-foreground line-through">${deal.originalPrice}</span>
                      </div>

                      <div className="flex items-center space-x-2 mb-4">
                        <Clock className="h-4 w-4 text-red-500" />
                        <div className="flex items-center space-x-1 text-sm font-mono">
                          <span className="bg-gray-800 text-white px-2 py-1 rounded">
                            {String(timeLeft[index]?.hours || 0).padStart(2, "0")}
                          </span>
                          <span>:</span>
                          <span className="bg-gray-800 text-white px-2 py-1 rounded">
                            {String(timeLeft[index]?.minutes || 0).padStart(2, "0")}
                          </span>
                          <span>:</span>
                          <span className="bg-gray-800 text-white px-2 py-1 rounded">
                            {String(timeLeft[index]?.seconds || 0).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 hover:bg-blue-600">Add to Cart</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
