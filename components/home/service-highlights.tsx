"use client"

import { Truck, Shield, Headphones, RotateCcw, CreditCard, Gift } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $100",
    color: "text-orange-500",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment processing",
    color: "text-green-500",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "24/7 customer service support",
    color: "text-blue-500",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
    color: "text-purple-500",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options",
    color: "text-indigo-500",
  },
  {
    icon: Gift,
    title: "Gift Cards",
    description: "Perfect gift for everyone",
    color: "text-pink-500",
  },
]

export function ServiceHighlights() {
  return (
    <section className="py-12 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="flex flex-col items-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className={`h-8 w-8 ${service.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                  <p className="text-xs text-muted-foreground leading-tight">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
