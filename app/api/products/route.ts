import { type NextRequest, NextResponse } from "next/server"
import { getProducts, createProduct, searchProducts } from "@/lib/db-operations"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "createdAt"
    const order = searchParams.get("order") || "desc"

    const skip = (page - 1) * limit
    const sortObj = { [sort]: order === "desc" ? -1 : 1 }

    let products

    if (search) {
      products = await searchProducts(search, { limit, skip })
    } else {
      const filter = category ? { category } : {}
      products = await getProducts(filter, { limit, skip, sort: sortObj })
    }

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        hasMore: products.length === limit,
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json()

    // Validate required fields
    const requiredFields = ["name", "description", "price", "originalPrice", "category", "brand", "sku", "stock"]
    for (const field of requiredFields) {
      if (!productData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Set default values
    const product = {
      ...productData,
      images: productData.images || [],
      rating: { average: 0, count: 0 },
      specifications: productData.specifications || [],
      tags: productData.tags || [],
      featured: productData.featured || false,
      status: productData.status || "active",
      seo: productData.seo || {},
    }

    const newProduct = await createProduct(product)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
