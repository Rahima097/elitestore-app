"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const blogPosts = [
  {
    id: 1,
    title: "Smart Home Devices: The Future of Living",
    excerpt: "Discover how smart home technology is revolutionizing the way we live and interact with our spaces.",
    image: "/images/blog-1.jpg?height=200&width=300&text=Smart+Home",
    author: "John Doe",
    date: "Jan 15, 2024",
    category: "Technology",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Best Ways to Style Your Home This Season",
    excerpt: "Get inspired with the latest home decor trends and styling tips for the current season.",
    image: "/images/blog-2.jpg?height=200&width=300&text=Home+Decor",
    author: "Jane Smith",
    date: "Jan 12, 2024",
    category: "Lifestyle",
    readTime: "3 min read",
  },
  {
    id: 3,
    title: "Top 10 Fashion and style Trends for 2025 ",
    excerpt: "Stay ahead of the fashion curve with our comprehensive guide to this year's biggest trends.",
    image: "/images/blog-3.jpg?height=200&width=300&text=Fashion+2024",
    author: "Mike Johnson",
    date: "Jan 10, 2025",
    category: "Fashion",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "Sustainable Shopping: A Complete Guide",
    excerpt: "Learn how to make more environmentally conscious purchasing decisions without compromising on quality.",
    image: "/images/blog-4.jpg?height=200&width=300&text=Sustainable",
    author: "Sarah Wilson",
    date: "Jan 8, 2024",
    category: "Sustainability",
    readTime: "6 min read",
  },
]

export function BlogSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest From Blog</h2>
            <p className="text-muted-foreground">Stay updated with our latest news and insights</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">{post.category}</Badge>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 group-hover:hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-primary hover:text-primary text-sm font-medium flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                      >
                        <span>Read More</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
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
