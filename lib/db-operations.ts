import { ObjectId, type InsertOneResult, type UpdateResult, type DeleteResult } from "mongodb"
import { getUsersCollection, getProductsCollection, getOrdersCollection, getReviewsCollection } from "./mongodb"
import bcrypt from "bcryptjs"

// Pure TypeScript interfaces (no Mongoose schemas)
export interface User {
  _id?: ObjectId
  name: string
  email: string
  password?: string
  image?: string | null
  role: "user" | "admin"
  provider?: string
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  phone?: string
  dateOfBirth?: Date
  preferences?: {
    newsletter: boolean
    notifications: boolean
  }
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  _id?: ObjectId
  name: string
  description: string
  price: number
  originalPrice: number
  category: string
  brand: string
  images: Array<{
    url: string
    alt: string
  }>
  stock: number
  sku: string
  rating: {
    average: number
    count: number
  }
  specifications: Array<{
    name: string
    value: string
  }>
  tags: string[]
  featured: boolean
  status: "active" | "inactive" | "out-of-stock"
  seo: {
    title?: string
    description?: string
    keywords?: string[]
  }
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  _id?: ObjectId
  userId: ObjectId
  items: Array<{
    productId: ObjectId
    quantity: number
    price: number
    name: string
    image: string
  }>
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
  }
  paymentMethod: string
  paymentResult?: {
    id: string
    status: string
    update_time: string
    email_address: string
  }
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  trackingNumber?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  _id?: ObjectId
  userId: ObjectId
  productId: ObjectId
  rating: number
  title: string
  comment: string
  verified: boolean
  helpful: {
    count: number
    users: ObjectId[]
  }
  createdAt: Date
  updatedAt: Date
}

// USER OPERATIONS - Pure MongoDB
export async function createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User> {
  const users = await getUsersCollection()

  const user: User = {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  if (userData.password) {
    user.password = await bcrypt.hash(userData.password, 12)
  }

  const result: InsertOneResult = await users.insertOne(user)
  return { ...user, _id: result.insertedId }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsersCollection()
  return (await users.findOne({ email })) as User | null
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsersCollection()
  return (await users.findOne({ _id: new ObjectId(id) })) as User | null
}

export async function updateUser(id: string, updateData: Partial<User>): Promise<UpdateResult> {
  const users = await getUsersCollection()
  return await users.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
}

// PRODUCT OPERATIONS - Pure MongoDB
export async function createProduct(productData: Omit<Product, "_id" | "createdAt" | "updatedAt">): Promise<Product> {
  const products = await getProductsCollection()

  const product: Product = {
    ...productData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result: InsertOneResult = await products.insertOne(product)
  return { ...product, _id: result.insertedId }
}

export async function getProducts(filter: any = {}, options: any = {}): Promise<Product[]> {
  const products = await getProductsCollection()
  const { limit = 20, skip = 0, sort = { createdAt: -1 } } = options

  return (await products.find(filter).sort(sort).skip(skip).limit(limit).toArray()) as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProductsCollection()
  return (await products.findOne({ _id: new ObjectId(id) })) as Product | null
}

export async function getProductBySku(sku: string): Promise<Product | null> {
  const products = await getProductsCollection()
  return (await products.findOne({ sku })) as Product | null
}

export async function updateProduct(id: string, updateData: Partial<Product>): Promise<UpdateResult> {
  const products = await getProductsCollection()
  return await products.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updateData,
        updatedAt: new Date(),
      },
    },
  )
}

export async function deleteProduct(id: string): Promise<DeleteResult> {
  const products = await getProductsCollection()
  return await products.deleteOne({ _id: new ObjectId(id) })
}

export async function searchProducts(query: string, options: any = {}): Promise<Product[]> {
  const products = await getProductsCollection()
  const { limit = 20, skip = 0 } = options

  return (await products
    .find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } },
      ],
    })
    .skip(skip)
    .limit(limit)
    .toArray()) as Product[]
}

// ORDER OPERATIONS - Pure MongoDB
export async function createOrder(orderData: Omit<Order, "_id" | "createdAt" | "updatedAt">): Promise<Order> {
  const orders = await getOrdersCollection()

  const order: Order = {
    ...orderData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result: InsertOneResult = await orders.insertOne(order)
  return { ...order, _id: result.insertedId }
}

export async function getOrdersByUserId(userId: string, options: any = {}): Promise<Order[]> {
  const orders = await getOrdersCollection()
  const { limit = 20, skip = 0, sort = { createdAt: -1 } } = options

  return (await orders
    .find({ userId: new ObjectId(userId) })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray()) as Order[]
}

export async function getOrderById(id: string): Promise<Order | null> {
  const orders = await getOrdersCollection()
  return (await orders.findOne({ _id: new ObjectId(id) })) as Order | null
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"],
  trackingNumber?: string,
): Promise<UpdateResult> {
  const orders = await getOrdersCollection()
  const updateData: any = {
    status,
    updatedAt: new Date(),
  }

  if (trackingNumber) {
    updateData.trackingNumber = trackingNumber
  }

  return await orders.updateOne({ _id: new ObjectId(id) }, { $set: updateData })
}

// REVIEW OPERATIONS - Pure MongoDB
export async function createReview(reviewData: Omit<Review, "_id" | "createdAt" | "updatedAt">): Promise<Review> {
  const reviews = await getReviewsCollection()

  const review: Review = {
    ...reviewData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const result: InsertOneResult = await reviews.insertOne(review)

  // Update product rating using pure MongoDB aggregation
  await updateProductRating(reviewData.productId.toString())

  return { ...review, _id: result.insertedId }
}

export async function getReviewsByProductId(productId: string, options: any = {}): Promise<Review[]> {
  const reviews = await getReviewsCollection()
  const { limit = 20, skip = 0, sort = { createdAt: -1 } } = options

  return (await reviews
    .find({ productId: new ObjectId(productId) })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .toArray()) as Review[]
}

export async function updateProductRating(productId: string): Promise<void> {
  const reviews = await getReviewsCollection()
  const products = await getProductsCollection()

  const reviewStats = await reviews
    .aggregate([
      { $match: { productId: new ObjectId(productId) } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ])
    .toArray()

  const stats = reviewStats[0] || { averageRating: 0, totalReviews: 0 }

  await products.updateOne(
    { _id: new ObjectId(productId) },
    {
      $set: {
        "rating.average": Math.round(stats.averageRating * 10) / 10,
        "rating.count": stats.totalReviews,
        updatedAt: new Date(),
      },
    },
  )
}

// ANALYTICS OPERATIONS - Pure MongoDB Aggregation
export async function getDashboardStats() {
  const users = await getUsersCollection()
  const products = await getProductsCollection()
  const orders = await getOrdersCollection()

  const [userCount, productCount, orderStats] = await Promise.all([
    users.countDocuments(),
    products.countDocuments(),
    orders
      .aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: "$total" },
            averageOrderValue: { $avg: "$total" },
          },
        },
      ])
      .toArray(),
  ])

  const stats = orderStats[0] || { totalOrders: 0, totalRevenue: 0, averageOrderValue: 0 }

  return {
    totalUsers: userCount,
    totalProducts: productCount,
    totalOrders: stats.totalOrders,
    totalRevenue: stats.totalRevenue,
    averageOrderValue: stats.averageOrderValue,
  }
}

export async function getRecentOrders(limit = 10): Promise<Order[]> {
  const orders = await getOrdersCollection()
  return (await orders.find({}).sort({ createdAt: -1 }).limit(limit).toArray()) as Order[]
}

export async function getTopProducts(limit = 10) {
  const orders = await getOrdersCollection()
  return await orders
    .aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
          totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
          productName: { $first: "$items.name" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: limit },
    ])
    .toArray()
}
