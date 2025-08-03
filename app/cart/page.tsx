"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Gift, Truck, Shield } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { motion } from "framer-motion"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const shipping = total > 100 ? 0 : 9.99
  const tax = total * 0.08
  const finalTotal = total + shipping + tax - discount

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(total * 0.1)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
              <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
              <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/products">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Shopping Cart
              </span>
            </h1>
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex gap-4">
                      {/* Product Img */}
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                        <Img
                          src={item.Img || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                            {item.color && <p className="text-sm text-muted-foreground">Color: {item.color}</p>}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-lg font-semibold text-purple-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < items.length - 1 && <Separator />}
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <Truck className="h-8 w-8 text-green-600" />
                <div>
                  <div className="font-semibold text-green-800 dark:text-green-400">Free Shipping</div>
                  <div className="text-sm text-green-600 dark:text-green-500">On orders over $100</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="font-semibold text-blue-800 dark:text-blue-400">Secure Payment</div>
                  <div className="text-sm text-blue-600 dark:text-blue-500">SSL encrypted</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                <Gift className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="font-semibold text-purple-800 dark:text-purple-400">Easy Returns</div>
                  <div className="text-sm text-purple-600 dark:text-purple-500">30-day policy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Promo Code</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800">Code applied! Save ${discount.toFixed(2)}</Badge>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-purple-600">${finalTotal.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  size="lg"
                  asChild
                >
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>

                {/* Continue Shopping */}
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/products">Continue Shopping</Link>
                </Button>

                {/* Payment Methods */}
                <div className="pt-4">
                  <div className="text-sm text-muted-foreground mb-2">We accept:</div>
                  <div className="flex gap-2">
                    {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
                      <div key={method} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
