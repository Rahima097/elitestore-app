import { MongoClient, type Db, type Collection } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

// Database helper
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db("elitestore")
}

// Collection helpers - pure MongoDB collections
export async function getUsersCollection(): Promise<Collection> {
  const db = await getDatabase()
  return db.collection("users")
}

export async function getProductsCollection(): Promise<Collection> {
  const db = await getDatabase()
  return db.collection("products")
}

export async function getOrdersCollection(): Promise<Collection> {
  const db = await getDatabase()
  return db.collection("orders")
}

export async function getReviewsCollection(): Promise<Collection> {
  const db = await getDatabase()
  return db.collection("reviews")
}

export async function getCategoriesCollection(): Promise<Collection> {
  const db = await getDatabase()
  return db.collection("categories")
}
